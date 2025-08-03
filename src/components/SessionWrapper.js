
import { SupabaseAuthProvider } from '@/lib/SupabaseAuthContext';

export default function SessionWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
