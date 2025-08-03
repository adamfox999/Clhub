"use client";
import { useSession } from 'next-auth/react';

import { useEffect, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  CheckoutProvider,
  PaymentElement,
  useCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function BookingForm({ course, price, onSuccess, customerEmail }) {
  const checkout = useCheckout();
  const [form, setForm] = useState({
    name: '',
    notes: ''
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Don't call updateEmail!
    const confirmResult = await checkout.confirm();
    if (confirmResult.type === 'error') {
      setMessage(confirmResult.error.message);
      setLoading(false);
      return;
    }

    onSuccess();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', color: '#fff' }}>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email<br/>
        <input name="email" value={customerEmail || ''} readOnly style={{ background: "#ddd" }} />
      </label>
      <label>
        Notes (optional)
        <textarea name="notes" value={form.notes} onChange={handleChange} />
      </label>
      <h4>Payment</h4>
      <div style={{ background: '#222', border: '1px solid #555', padding: 8, borderRadius: 4, marginBottom: 8 }}>
        <PaymentElement id="payment-element" />
      </div>
      <button disabled={loading} style={{ marginTop: 12 }}>
        {loading ? "Processing..." : `Pay £${price}`}
      </button>
      {message && <div style={{ color: 'red', marginTop: 8 }}>{message}</div>}
    </form>
  );
}


export default function BookingPageWrapper() {
  return (
    <Suspense>
      <BookingPage />
    </Suspense>
  );
}

function BookingPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const { data: session } = useSession();
  const [course, setCourse] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [price, setPrice] = useState(null);
  const router = useRouter();

  // ...existing code...
}
