
import { AuthProvider } from '@/lib/SupabaseAuthContext';

export default function SessionWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
