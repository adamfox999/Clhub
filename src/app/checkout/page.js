'use client';

import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  CheckoutProvider,
  PaymentElement,
  useCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function EmailInput({ email, setEmail, error, setError }) {
  const checkout = useCheckout();

  const handleBlur = async () => {
    if (!email) return;
    const { type, error: stripeError } = await checkout.updateEmail(email);
    if (type === "error") setError(stripeError.message);
  };

  const handleChange = (e) => {
    setError(null);
    setEmail(e.target.value);
  };

  return (
    <>
      <label>
        Email
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          required
        />
      </label>
      {error && <div id="email-errors" style={{ color: 'red' }}>{error}</div>}
    </>
  );
}

function CheckoutForm() {
  const checkout = useCheckout();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { type, error: stripeError } = await checkout.updateEmail(email);
    if (type === "error") {
      setEmailError(stripeError.message);
      setMessage(stripeError.message);
      setIsLoading(false);
      return;
    }

    const confirmResult = await checkout.confirm();

    if (confirmResult.type === 'error') {
      setMessage(confirmResult.error.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', color: '#fff' }}>
      <EmailInput
        email={email}
        setEmail={setEmail}
        error={emailError}
        setError={setEmailError}
      />
      <h4>Payment</h4>
      <div style={{ background: '#222', border: '1px solid #555', padding: 8, borderRadius: 4, marginBottom: 8 }}>
        <PaymentElement id="payment-element" />
      </div>
      <button disabled={isLoading} id="submit" style={{ marginTop: 12 }}>
        {isLoading ? "Processing..." : "Pay now"}
      </button>
      {message && <div id="payment-message" style={{ color: 'red', marginTop: 8 }}>{message}</div>}
    </form>
  );
}

export default function CheckoutPage() {
  // Use fetchClientSecret to get the client secret from your API
  const fetchClientSecret = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 3000, // £30 (replace as needed)
        description: "Course Booking - RYA Level 1",
        metadata: { type: 'course', courseId: 'xyz123' },
      }),
    });
    const data = await res.json();
    return data.clientSecret;
  };

  // All appearance config goes here:
  const appearance = {
    theme: 'night',
    variables: {
      colorText: '#fff',
      colorPrimary: '#00aeef',
      fontSizeBase: '16px',
    },
    rules: {
      '.Input, .Tab, .Block': {
        color: "#fff",
        backgroundColor: "#222",
      },
      '::placeholder': {
        color: '#aaa',
      }
    }
  };

  return (
    <div style={{ minHeight: '80vh', background: '#111' }}>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>Checkout</h1>
      <CheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret,
          elementsOptions: { appearance },
        }}
      >
        <CheckoutForm />
      </CheckoutProvider>
    </div>
  );
}
