'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');

  const handleEmailLogin = (e) => {
    e.preventDefault();
    signIn('email', { email });
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Sign in</h1>

      <button onClick={() => signIn('google')}>Sign in with Google</button>

      <form onSubmit={handleEmailLogin} style={{ marginTop: '1rem' }}>
        <label>
          Sign in with Email:
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send Magic Link</button>
      </form>
    </main>
  );
}
