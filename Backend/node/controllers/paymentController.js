require('dotenv').config()
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

let Usage = require('../models/usageModel');
let Payment = require('../models/paymentModel');

const site = 'https://www.teachassistai.com'

const stripe = require('../config/stripe');

const plans = new Map([
	['Starter', { priceInCent: 999, requestlimit: 30, noOfFilesUploadedLimit: 20, name: 'Starter' }],
	['Professional', { priceInCent: 1499, requestlimit: 90, noOfFilesUploadedLimit: 50, name: 'Professional' }
	],
]);


const priceIDs = {
	"Starter": 'price_1OCktILFLZPxO7T9nAnMZLuy',
	"Professional": "price_1OCl5YLFLZPxO7T9kYM5ILkK"
}

exports.processPayment = asyncErrorHandler(async (req, res, next) => {

	// console.log(plans);
	let plan = plans.get(req.body.plan);
	// console.log(plan);

	if (plan === '7-Days Trial') {
		try {
			let usage = await Usage.findOne({ user: req.user.id });
			usage.payment = false;
			usage.usageLimit = 5;
			usage.plan = 'Free';
			await usage.save();
			return res.json({ url: `${site}/success` })
		} catch (error) {
			console.log(error)
			return res.json({ url: `${site}/cancel` })
		}
	}

	const customer = await stripe.customers.create({
		metadata: {
			userId: req.user.id,
			plan: JSON.stringify(plan)
		}
	});

	try {
		const session = await stripe.checkout.sessions.create({
			customer: customer.id,
			line_items: [{
				price_data: {
					currency: 'usd',
					unit_amount: plan.priceInCent,
					product_data: {
						name: plan.name
					},
				},
				quantity: 1,
			}],
			payment_method_types: ['card'],
			// line_items: [{
			//     price: priceIDs[req.body.plan],
			//     quantity: 1,
			// }],
			mode: 'payment',
			success_url: `${site}/success`,
			cancel_url: `${site}/cancel`
		})

		res.status(200).json({
			success: true,
			url: session.url
		});

	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred while creating the payment intent.' });
	}
});


exports.cancelSubscription = asyncErrorHandler(async (req, res, next) => {

	let entry = null;
	console.log('Going to delete subscription');

	try {
		// Fetch the payment entry
		entry = await Payment.findOne({ user: req.user.id });
		console.log('Deleted: ', entry);
	} catch (error) {
		console.error('Error fetching payment entry:', error);
		return res.status(404).send({ error: { message: 'Error fetching payment entry.' } });
	}
	// Cancel the subscription
	try {
		const paymentIntent = await stripe.paymentIntents.retrieve(entry.payment.paymentIntentId);

		// Check if the payment intent can be refunded
		if (paymentIntent.status === 'succeeded') {
			const refund = await stripe.refunds.create({
				payment_intent: entry.payment.paymentIntentId,
			});

			console.log('Payment refunded:', refund);
		} else {
			console.log('Payment cannot be refunded. Current status:', paymentIntent.status);
		}
		// const deletedSubscription = await stripe.subscriptions.del(
		//     entry.payment.subscription
		// );
		let usage = await Usage.findOne({ user: req.user.id });
		usage.payment = false;
		usage.usageLimit = 0;
		usage.plan = 'No';
		await usage.save();

		await Payment.deleteOne({ _id: entry._id });
		console.log('Deleted Payment: ', entry);
		res.send({ subscription: usage.user });
	} catch (error) {
		console.error('Error canceling subscription:', error);
		return res.status(400).send({ error: { message: error.message } });
	}
});

exports.createSubscription = asyncErrorHandler(async (req, res, next) => {

	// const user_Id = req.user.id

	let plan = plans.get(req.body.plan);
	// create a stripe customer
	const customer = await this.stripe.customers.create({
		name: req.name,
		email: req.email,
		metadata: {
			userId: req.user.id,
			plan: JSON.stringify(plan)
		},
		payment_method: req.paymentMethod,
		invoice_settings: {
			default_payment_method: req.paymentMethod,
		},
	});


	// get the price id from the front-end
	const priceId = req.priceId;

	// create a stripe subscription
	const subscription = await this.stripe.subscriptions.create({
		customer: customer.id,
		items: [{ price: priceId }],
		payment_settings: {
			payment_method_options: {
				card: {
					request_three_d_secure: 'any',
				},
			},
			payment_method_types: ['card'],
			save_default_payment_method: 'on_subscription',
		},
		expand: ['latest_invoice.payment_intent'],
	});

	// return the client secret and subscription id
	return {
		clientSecret: subscription.latest_invoice.payment_intent.client_secret,
		subscriptionId: subscription.id,
	};

})