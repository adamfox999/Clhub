import Navbar from '@/components/Navbar';
import { SupabaseAuthProvider } from '@/lib/SupabaseAuthContext';

// Simple homepage for ClubHub
export default function HomePage() {
  return (
    <SupabaseAuthProvider>
      <Navbar />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to ClubHub</h1>
        <p>This is your new homepage. Use the navigation to access features.</p>
      </main>
    </SupabaseAuthProvider>
  );
}