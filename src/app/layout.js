import '../styles/globals.css';
import { SupabaseAuthProvider } from '@/lib/SupabaseAuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

          {children}

      </body>
    </html>
  );
}
