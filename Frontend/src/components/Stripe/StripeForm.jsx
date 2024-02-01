import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripePromise from '../../util/stripe';
import { backend_url } from '../../util/variables';
import axios from 'axios';

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({

            type: 'card',
            card: elements.getElement(CardElement),

        });

        if (error) {
            alert('Payment Method Error');
            console.error('Payment Method Error: ', error);
            setLoading(false);
        } else {
            const { data } = await axios.post(`${backend_url}/payment/process`, {
                amount: 1000, // Example: 10.00 USD
            });

            const { clientSecret } = data;

            alert('Client Secret: ', clientSecret);
            console.log('Here is your client Secret: ', clientSecret);

            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                alert('Confirm Error');
                console.error(confirmError);
                setLoading(false);
            } else {
                alert('Confirm Payment');
                console.log(paymentIntent);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-[30rem] mx-auto shadow-md px-6 py-5">
            <CardElement options={{ style: { fontSize: '16px', color: '#32325d' } }} />

            <div className="flex flex-col">
                <button type="submit" className="bg-primary my-5 py-3 text-xl text-white" disabled={!stripe || !elements}>
                    Pay
                </button>
            </div>
        </form>
    );
};

const PaymentPage = () => {
    return (
        <div className="max-w-[1440px] mx-auto">
            <div className="mx-8">
                <h2 className="text-center text-4xl text-secondary font-extrabold my-12">Payment Page</h2>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;
