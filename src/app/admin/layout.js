import AdminNavbar from '@/components/AdminNavbar';
import { SupabaseAuthProvider } from '@/lib/SupabaseAuthContext';

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SupabaseAuthProvider>
          <AdminNavbar />
          {children}
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
