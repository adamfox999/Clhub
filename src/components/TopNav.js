"use client";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function TopNav() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <nav style={{ width: '100%', background: '#222', color: '#fff', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 600, fontSize: 18 }}>Clhub</div>
      <div>
        {user ? (
          <span>Signed in as <strong>{user.email}</strong></span>
        ) : (
          <a href="/auth/signin" style={{ color: '#fff', textDecoration: 'underline' }}>Sign In</a>
        )}
      </div>
    </nav>
  );
}
