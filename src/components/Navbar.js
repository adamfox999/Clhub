'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link href="/" style={{ marginRight: '1rem' }}>Boat Park</Link>
        <Link href="/admin" style={{ marginRight: '1rem' }}>Admin</Link>
        <Link href="/sailing-school" style={{ marginRight: '1rem' }}>Sailing School</Link>
      </div>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : session ? (
          <>
            <span style={{ marginRight: '1rem' }}>{session.user.name || session.user.email}</span>
            <button onClick={() => signOut()}>Log out</button>
          </>
        ) : (
          <button onClick={() => signIn()}>Log in</button>
        )}
      </div>
    </nav>
  );
}
