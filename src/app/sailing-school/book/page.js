'use client';

import { useEffect, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";
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


export default function BookingPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const { data: session } = useSession();
  const [course, setCourse] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [price, setPrice] = useState(null);
  const router = useRouter();

  // Fetch course info
  useEffect(() => {
    if (!courseId) return;
    fetch(`/api/courses?id=${courseId}`)
      .then(res => res.json())
      .then(data => {
        const c = Array.isArray(data) ? data[0] : data;
        setCourse(c);
        if (session?.user?.role === 'member') {
          setPrice(c.memberPrice);
        } else {
          setPrice(c.nonMemberPrice);
        }
      });
  }, [courseId, session]);

  // NEW: Get Stripe customer, then checkout session
  useEffect(() => {
    // Only start if everything loaded and user is logged in
    if (!course || !price || !session?.user?.id) return;

    // 1. Get or create Stripe customer ID for this user
    fetch('/api/get-or-create-stripe-customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id }),
    })
      .then(res => res.json())
      .then(async ({ stripeCustomerId, error }) => {
        if (error || !stripeCustomerId) {
          alert("Problem getting Stripe customer: " + error);
          return;
        }
        // 2. Create the checkout session for this customer
        const res = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: price,
            description: `Course Booking: ${course.title} (${new Date(course.date).toLocaleDateString()})`,
            metadata: { type: 'course', courseId: course._id, userId: session.user.id },
            customerId: stripeCustomerId // <-- pass it!
          }),
        });
        const data = await res.json();
        if (data.error) {
          alert("Checkout session error: " + data.error);
          return;
        }
        setClientSecret(data.clientSecret);
      });
  }, [course, price, session]);

  if (!course) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading course...</p>;

  const appearance = {
    theme: 'stripe  ',
    variables: {

    },
  };

  return (
    <main style={{ minHeight: '80vh', background: '#111', color: '#fff' }}>
      <h1 style={{ textAlign: 'center' }}>Book: {course.title}</h1>
      <p><b>Date:</b> {new Date(course.date).toLocaleString()}</p>
      <p><b>Description:</b> {course.description}</p>
      <p><b>Duration:</b> {course.duration}</p>
      <p><b>Price:</b> £{price}</p>
      {clientSecret && (
        <CheckoutProvider
          stripe={stripePromise}
          options={{
            fetchClientSecret: async () => clientSecret,
            elementsOptions: { appearance },
          }}
        >
          {/* inside BookingPage */}
<BookingForm
  course={course}
  price={price}
  onSuccess={() => router.push('/sailing-school/success')}
  customerEmail={session?.user?.email}
/>
        </CheckoutProvider>
      )}
    </main>
  );
}
