'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/SupabaseAuthContext';
import { supabase } from '@/lib/supabaseClient';

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link href="/" style={{ marginRight: '1rem' }}>Boat Park</Link>
        <Link href="/admin" style={{ marginRight: '1rem' }}>Admin</Link>
        <Link href="/sailing-school" style={{ marginRight: '1rem' }}>Sailing School</Link>
      </div>
      <div>
        {loading ? (
          'Loading...'
        ) : user ? (
          <>
            <span style={{ marginRight: '1rem' }}>{user.email}</span>
            <button onClick={async () => { await supabase.auth.signOut(); }}>Log out</button>
          </>
        ) : (
          <Link href="/account/signin">
            <button>Log in</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
