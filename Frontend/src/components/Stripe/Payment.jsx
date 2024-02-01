import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51KTFAjLFLZPxO7T9TT5ZKCYBIqV6WoCiuoys9QKMahXjLMnkuMxoUg1hgkSCHYzm2QmjVA91CgEZ657Z4lWmctNt00stkQyjdp"); // starts with pk_

function Payment() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Payment;