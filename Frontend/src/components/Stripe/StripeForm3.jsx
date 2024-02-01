import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";
import { backend_url } from "../../util/variables";
import axios from "axios";

import stripePromise from '../../util/stripe';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.


export default function StripeForm3() {
    const [clientSecret, setClientSecret] = useState("");

    const fetchClientSecret = async () => {
        // Create PaymentIntent as soon as the page loads
        await axios.post((backend_url ? backend_url : "") + '/payment/process', {
            amount: 100
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setClientSecret(response.data.clientSecret);
            })
            .catch((error) => {
                alert("Error while fetching Client Secrect")
            });

    }

    useEffect(() => {
        fetchClientSecret()
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret}/>
                </Elements>
            )}
        </div>
    );
}