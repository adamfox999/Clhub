
import { SupabaseAuthProvider } from '@/lib/SupabaseAuthContext';

export default function SessionWrapper({ children }) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
}
