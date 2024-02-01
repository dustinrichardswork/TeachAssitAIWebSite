require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const stripe = require("./config/stripe");
const Payment = require("./models/paymentModel");
const Usage = require("./models/usageModel");
const { requestLimit } = require("./middlewares/requestLimit");
const { isAuthenticatedUser } = require("./middlewares/auth");
const User = require("./models/userModel");

const compression = require("compression");
const app = express();

app.use(cors());
app.use(express.static('/public'))
app.set('view engine', 'ejs')
/*
	Email Body for the Plans
*/
const emailBody = {
	Free: `
    <ul>
    <li>Access To All Chatbots</li>
    <li>Free 5 chat requests per day</li>
    <li>1 member</li>
    <li>Write in 30+ languages</li>
</ul>
    `,
	Starter: `
    <ul>
    <li>Access to All the Chatbots</li>
    <li>30 chat requests per day</li>
    <li>1 member seat</li>
    <li>Write in 30+ languages</li>
    <li>24/7 live chat support</li>
    <li>All Grade Levels</li>
</ul>
    `,
	Professional: `
    <ul>
    <li>Access to All the Chatbots</li>
    <li>90 chat requests per day</li>
    <li>1 member seat</li>
    <li>Write in 30+ languages</li>
    <li>24/7 live chat support</li>
    <li>Access to chat history</li>
    <li>Extract responses to Word document/PDF/Google Doc/Excel</li>
    <li>All Grade Levels</li>
</ul>
    `,
};

let history = []

const mystripe = require('./config/stripe')

const webhookEndpoint = 'https://www.teachassistai.com/api/v1/stripe/webhook';
// Create or update the webhook endpoint
mystripe.webhookEndpoints.create({
	url: webhookEndpoint,
	enabled_events: ['charge.succeeded', 'charge.failed',
		'invoice.payment_succeeded', 'invoice.finalized',
		'invoice.payment_failed', 'customer.subscription.deleted',
		"payment_intent.succeeded", "payment_method.attached",
		"checkout.session.completed"
	] // Specify the events you want to receive
})
	.then(webhookEndpoint => {
		console.log('Webhook endpoint created/updated:', webhookEndpoint);
	})
	.catch(error => {
		console.error('Error creating/updating webhook endpoint:', error);
	});
// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
app.post(
	"/api/v1/stripe/webhook",
	express.json({ type: "application/json" }),
	async (request, response) => {
		// console.log('Here is your WebhooKL: ', request.body);

		console.log("Here is your Webhook Request: ==========================");

		const event = request.body;
		const checkrlt = history.filter(item => (item.id === event.id && item.type === event.type))
		if (checkrlt.length > 0) {
			return response.json({ received: true });
		}

		history = history.concat({ id: event.id, type: event.type })

		// Handle the event
		switch (event.type) {
			case 'invoice.payment_succeeded': {
				const dataObject = event.data.object;
				if (dataObject['billing_reason'] == 'subscription_create') {
					// The subscription automatically activates after successful payment
					// Set the payment method used to pay the first invoice
					// as the default payment method for that subscription
					const subscription_id = dataObject['subscription']
					const payment_intent_id = dataObject['payment_intent']

					// Retrieve the payment intent used to pay the subscription
					const payment_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

					try {
						const subscription = await stripe.subscriptions.update(
							subscription_id,
							{
								default_payment_method: payment_intent.payment_method,
							},
						);

						let payment = await Payment.findOne({ "payment.subscription": subscription_id })
						let usage = await Usage.findOne({ user: payment.user });
						usage.payment = true;
						await usage.save();
						// console.log("Default payment method set for subscription:" + payment_intent.payment_method);
					} catch (err) {
						console.log(err);
						console.log(`??  Falied to update the default payment method for subscription: ${subscription_id}`);
					}
				};
			}
				break;
			case 'invoice.finalized':
				console.log('Event: invoice.finalized');
				// If you want to manually send out invoices to your customers
				// or store them locally to reference to avoid hitting Stripe rate limits.
				break;
			case 'invoice.payment_failed':

				const subscription_id = dataObject['subscription']
				const payment_intent_id = dataObject['payment_intent']

				let entry = null;

				try {
					// Fetch the payment entry
					entry = await Payment.findOne({ user: req.user.id });
					// console.log('Deleted: ', entry);
				} catch (error) {
					console.error('Error fetching payment entry:', error);
					// return res.status(400).send({ error: { message: 'Error fetching payment entry.' } });
				}
				// Cancel the subscription
				try {
					const deletedSubscription = await stripe.subscriptions.del(
						entry.payment.subscription
					);
					let usage = await Usage.findOne({ user: req.user.id });
					usage.payment = false;
					usage.usageLimit = 5;
					usage.plan = 'Free';
					await usage.save();

					await Payment.deleteOne({ _id: entry._id });
					// console.log('Deleted Payment: ', entry);
					// res.send({ subscription: deletedSubscription });
				} catch (error) {
					console.error('Error canceling subscription:', error);
					// return res.status(400).send({ error: { message: error.message } });
				}
				// Handle the payment failure, e.g., notify the customer, update payment information, etc.
				console.log('Payment failed for invoice:', event.data.object.id);
				break;
			case 'customer.subscription.deleted':
				if (event.request != null) {
					// handle a subscription cancelled by your request
					// from above.
					console.log('Event: customer.subscription.deleted: (event.request != null)');
				} else {
					console.log('Event: customer.subscription.deleted: (event.request == null)');
					// handle subscription cancelled automatically based
					// upon your subscription settings.
				}
				break;
			case "payment_intent.succeeded":
				const paymentIntent = event.data.object;
				// Then define and call a method to handle the successful attachment of a PaymentMethod.
				// handlePaymentMethodAttached(paymentMethod);
				// Then define and call a method to handle the successful payment intent.
				// handlePaymentIntentSucceeded(paymentIntent);
				break;
			case "payment_method.attached":
				const paymentMethod = event.data.object;
				// Then define and call a method to handle the successful attachment of a PaymentMethod.
				// handlePaymentMethodAttached(paymentMethod);
				break;
			case "checkout.session.completed":
				const checkoutSessionCompleted = event.data.object;
				console.log("Completed");
				try {
					const customer = await stripe.customers.retrieve(checkoutSessionCompleted.customer)
					// const subscriptions = await stripe.subscriptions.list({
					//   customer: customer.id,
					//   limit: 1  // Limit to 1 subscription for simplicity
					// });
					// if (subscriptions.data.length > 0) {
					//   const subscriptionId = subscriptions.data[0].id;
					//   console.log('Subscription ID:', subscriptionId);
					//   checkoutSessionCompleted.subscription = subscriptionId
					// } else {
					//   console.log('No active subscriptions found for the customer.');
					// }
					// const activatedSubscription = await stripe.subscriptions.update(subscriptionId, {
					//   cancel_at_period_end: false
					// });

					// console.log('Subscription activated:', activatedSubscription);
					console.log("Customer");
					let userId = customer.metadata.userId;
					let plan = customer.metadata.plan;
					plan = JSON.parse(plan);
					let payment = await Payment.create({
						payment: checkoutSessionCompleted,
						user: userId,
					});

					// console.log("Entry Added: ", payment);

					let temp = await Usage.find({ user: userId });
					// console.log("Usage Entry ID: ", temp[0].id);

					const user = await User.findOne({ _id: userId });

					if (temp[0]) {
						try {
							const updatedUsage = await Usage.findByIdAndUpdate(temp[0].id, {
								plan: plan["name"],
								usageCount: 0,
								usageLimit: plan["requestlimit"],
								noOfFilesUploaded: 0,
								noOfFilesUploadedLimit: plan["noOfFilesUploadedLimit"],
								payment: true,
								paymentDate: Date.now(),
								startDate: Date.now(),
								expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
							});

							if (updatedUsage) {
								// console.log("Usage plan updated:", updatedUsage);

								/*
												  Send Confirmation Email to Customer for buyin Plan
											  */
								console.log('user email: ', user.email)
								let mailOptions = {
									from: "info@teachassistai.com",
									to: user.email,
									subject: "Purchased Plan Information",
									html: `
                                        <h1>Congratulations!</h1>
                                        <h4>You have successfully purchased the ${plan["name"]
										} Plan</h4>
                                        <h6>You now have the following benefits</h6>
                                        ${emailBody[plan["name"]]}
                                        <p>Thank You!</p>
                                        `,
								};
								await sendEmail(mailOptions);
								let messageToAdmin = `
									<h1>New Subscriber</h1>
									<h4>Another User Subscribed to ${plan["name"]} Plan</h4>
									<h6>User Info:</h6>
									<ul>
									<li><b>First Name:</b> ${user.firstName}</li>
									<li><b>Last Name:</b> ${user.lastName}</li>
									<li><b>Email:</b> ${user.email}</li>
								</ul>
									`

								// formulating the message
								mailOptions.html = messageToAdmin;
								mailOptions.to = 'info@teachassistai.com'
								mailOptions.subject = `New ${plan["name"]} Plan Subscribed`
								await sendEmail(mailOptions);
							} else {
								console.log("Usage not found or no updates were made.");
							}
						} catch (err) {
							console.error("Error updating user plan:", err);
						}
					} else {
						let usage = await Usage.create({
							user: userId,
							plan: plan["name"],
							usageLimit: plan["requestlimit"],
							storageLimit: plan["noOfFilesUploadedLimit"],
							payment: true,
						});

						// console.log("Usage Crearted: ", usage);
					}
				} catch (error) {
					console.log(error)
				}
				// Then define and call a method to handle the successful attachment of a PaymentMethod.
				// handlePaymentMethodAttached(paymentMethod);
				break;
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		// Return a response to acknowledge receipt of the event
		response.json({ received: true });
	}
);


app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

const user = require("./routes/userRoute");
const post = require("./routes/postRoute");
const story = require("./routes/storyRoute");
// const order = require('./routes/orderRoute');
const payment = require("./routes/paymentRoute");
const chat = require("./routes/chatRoute");
const chatHistory = require("./routes/chatHistoryRoute");
const contact = require("./routes/contactRoute");
const sendEmail = require("./utils/sendEmail");

app.use("/api/v1", user);
app.use("/api/v1", post);
app.use("/api/v1/story", story);
// app.use('/api/v1', order);
app.use("/api/v1", payment);
app.use("/api/v1/chatbot", isAuthenticatedUser, requestLimit, chat);
app.use("/api/v1", chatHistory);
app.use("/api/v1", contact);

app.get("/updateUsage", async (req, res) => {
	let data = await Usage.find({ _id: "64fa041a77c59af3e0b4413d" });
	console.log("data: ", data);
	res.status(200).json({
		data,
	});
});

app.post('/submit-form', (req, res) => {
	// Perform any necessary form data processing here
	const formData = req.body;
	console.log('FormData: ', formData);

	// Set up a response as a stream
	res.setHeader('Content-Type', 'application/octet-stream'); // Adjust the content type as needed

	// Simulate streaming response (you can replace this with your actual stream)
	// Introduce a 2-second delay between sending chunks
	for (let i = 0; i < 10; i++) {
		setTimeout(() => {
			res.write(`Data chunk ${i}\n`);

			// Close the response after sending the last chunk
			if (i === 9) {
				res.end();
			}
		}, i * 2000); // Delay in milliseconds (i * 2000 = 2 seconds per chunk)
	}
	// End the response to signal completion
	// res.end();
});

let environment = "prod";
if (environment === "dev") {
	app.get("/", (req, res) => {
		res.json({
			message: "Server is Running!",
		});
	});
} else {
	let root = path.join(__dirname, "..", "build/");
	app.use(express.static(root));
	app.use(function (req, res, next) {
		if (
			req.method === "GET" &&
			req.accepts("html") &&
			!req.is("json") &&
			!req.path.includes(".")
		) {
			res.sendFile("index.html", { root });
		} else next();
	});
}

app.put("/updateUsage", async (req, res) => {
	let id = "64fa041a77c59af3e0b4413d";

	const updatedUsage = await Usage.findByIdAndUpdate(id, {
		plan: "Professional",
		usageLimit: null,
		payment: true,
		paymentDate: Date.now(),
	});

	res.status(200).json({
		usage: updatedUsage,
	});
});

// error middleware
// app.use(errorMiddleware);

module.exports = app;
