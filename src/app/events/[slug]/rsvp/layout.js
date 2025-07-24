import '../../../../styles/globals.css';
import SessionWrapper from '@/components/SessionWrapper';

export default function Layout({ children }) {
  return (
    <SessionWrapper>
      {children}
    </SessionWrapper>
  );
}
