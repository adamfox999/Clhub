'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/SupabaseAuthContext';
import { supabase } from '@/lib/supabaseClient';

export default function AdminNavbar() {
  const { user, loading } = useAuth();

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', background: '#222', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link href="/admin" style={{ marginRight: '1rem', color: '#fff' }}>Admin Home</Link>
        <Link href="/admin/food" style={{ marginRight: '1rem', color: '#fff' }}>Food Orders</Link>
        {/* Add more admin links as needed */}
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
