import AdminNavbar from '@/components/AdminNavbar';
import { SupabaseAuthProvider } from '@/lib/SupabaseAuthContext';

export default function AdminLayout({ children }) {
  return (
    <SupabaseAuthProvider>
      <AdminNavbar />
      {children}
    </SupabaseAuthProvider>
  );
}
