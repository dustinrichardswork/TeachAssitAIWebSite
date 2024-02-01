// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//     PaymentElement,
//     Elements,
//     useStripe,
//     useElements,
// } from '@stripe/react-stripe-js';
// import { backend_url, site } from '../../util/variables';
// import axios from 'axios';

// const CheckoutForm = () => {

//     const stripe = useStripe();
//     const elements = useElements();

//     const [errorMessage, setErrorMessage] = useState(null);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (elements == null) {
//             return;
//         }

//         // Trigger form validation and wallet collection
//         const { error: submitError } = await elements.submit();
//         if (submitError) {
//             // Show error to your customer
//             setErrorMessage(submitError.message);
//             return;
//         }

//         // Create the PaymentIntent and obtain clientSecret from your server endpoint
//         const { data } = await axios.post((backend_url) + '/payment/process', {
//             amount: 1000 // Example: 10.00 USD
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         const { clientSecret } = data;

//         console.log('Here is your client Secret: ', clientSecret);

//         const { error } = await stripe.confirmPayment({
//             //`Elements` instance that was used to create the Payment Element
//             elements,
//             clientSecret,
//             confirmParams: {
//                 return_url: site,
//             },
//         });

//         if (error) {
//             // This point will only be reached if there is an immediate error when
//             // confirming the payment. Show error to your customer (for example, payment
//             // details incomplete)
//             setErrorMessage(error.message);
//         } else {
//             // Your customer will be redirected to your `return_url`. For some payment
//             // methods like iDEAL, your customer will be redirected to an intermediate
//             // site first to authorize the payment, then redirected to the `return_url`.
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <PaymentElement />
//             <button
//                 className='bg-primary w-full py-3 my-5 rounded-md border-2 text-white border-primary font-semibold'
//                 type="submit" disabled={!stripe || !elements}
//             >
//                 Pay
//             </button>

//             {/* Show error message to your customers */}
//             {errorMessage && <div>{errorMessage}</div>}
//         </form>
//     );
// };

// const stripePromise = loadStripe('pk_test_51NLvznEfKiCSqs7H5WsD8OVND0uNTpfkx02xHhIWVqThXgFOQC9zvkfjDGjsWy3KL1e4tD1DmRXxkjrBSE0Z39AI00klH0Ves5');

// const options = {
//     mode: 'payment',
//     amount: 1099,
//     currency: 'usd',
//     // Fully customizable with appearance API.
//     appearance: {
//         /*...*/
//     },
// };


// const StripeForm2 = () => (
//     <div className=' max-w-[1440px] mx-auto'>
//         <div className='mx-3 md:mx-auto max-w-[30rem]'>
//             <h2 className='text-center text-4xl font-semibold my-12'>Payment Page</h2>
//             <Elements stripe={stripePromise} options={options}>
//                 <CheckoutForm />
//             </Elements>
//         </div>
//     </div>
// );

// export default StripeForm2