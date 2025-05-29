'use client';

import { useEffect, useState } from 'react';

export default function ReturnPage() {
  const [status, setStatus] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get('session_id');
    if (!session_id) return;

    fetch(`/api/session-status?session_id=${session_id}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') return <p>Redirecting you to checkout…</p>;
  if (status === 'complete') return (
    <main style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>Payment Successful!</h1>
      <p>
        Thank you! A confirmation email will be sent to {customerEmail}.
      </p>
    </main>
  );
  if (status) return <p>Payment status: {status}</p>;
  return <p>Loading…</p>;
}
