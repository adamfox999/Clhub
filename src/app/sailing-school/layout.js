import '../../styles/global.css';
import SessionWrapper from '@/components/SessionWrapper';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
        <Navbar />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
