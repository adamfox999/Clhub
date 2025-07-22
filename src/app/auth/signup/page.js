'use client';
import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [gdpr, setGdpr] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!gdpr || !terms) {
      setError('You must accept GDPR and Terms & Conditions.');
      return;
    }
    setLoading(true);
    const { supabase } = await import('@/lib/supabaseClient');
    const { error } = await supabase.auth.signUp({ email });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for a confirmation link!');
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: 400, margin: '0 auto' }}>
      <h1>Create your ClubHub account</h1>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>
          Email address
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
            style={{ marginTop: 4, padding: 8, fontSize: 16 }}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={gdpr}
            onChange={e => setGdpr(e.target.checked)}
            required
            disabled={loading}
          />
          I consent to ClubHub storing my data for account and communication purposes (GDPR)
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={terms}
            onChange={e => setTerms(e.target.checked)}
            required
            disabled={loading}
          />
          I accept the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
        </label>
        <button type="submit" disabled={loading} style={{ padding: '0.5rem', fontSize: 16 }}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: 16 }}>{error}</p>}
      {message && <p style={{ color: 'green', marginTop: 16 }}>{message}</p>}
    </main>
  );
}
