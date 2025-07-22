// This file was moved from /auth/signin/page.js
'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/SupabaseAuthContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  // Supabase email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    const { supabase } = await import('@/lib/supabaseClient');
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the login link!');
    }
  };

  if (user) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Already signed in</h1>
        <p>You are already logged in as {user.email}.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: 400, margin: '0 auto' }}>
      <h1>Sign in to ClubHub</h1>
      <p style={{ marginBottom: 24 }}>Choose a sign-in method below.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <button
          type="button"
          disabled={loading}
          style={{ padding: '0.75rem', fontSize: 16, marginBottom: 8 }}
          onClick={async () => {
            setLoading(true);
            setError('');
            setMessage('');
            const { supabase } = await import('@/lib/supabaseClient');
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
            setLoading(false);
            if (error) setError(error.message);
          }}
        >
          {loading ? 'Loading...' : 'Sign in with Google'}
        </button>

        <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontWeight: 500 }}>
            Email address
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={{ marginTop: 4, padding: 8, fontSize: 16 }}
            />
          </label>
          <button type="submit" disabled={loading} style={{ padding: '0.5rem', fontSize: 16 }}>
            {loading ? 'Sending...' : 'Sign in with Email'}
          </button>
        </form>
      </div>

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <span>Don't have an account?{' '}</span>
        <a href="/people/signup" style={{ color: '#0070f3', textDecoration: 'underline' }}>Create an account</a>
      </div>

      {error && <p style={{ color: 'red', marginTop: 16 }}>{error}</p>}
      {message && <p style={{ color: 'green', marginTop: 16 }}>{message}</p>}
    </main>
  );
}
