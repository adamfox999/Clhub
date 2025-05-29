import { sendMail } from '@/lib/sendMail';

export async function GET() {
  await sendMail({
    to: 'amobilefox@gmail.com', // <-- change to your test email address
    subject: 'Mailgun Test Email',
    text: 'This is a test email sent from ClubHub via Mailgun!',
  });
  return Response.json({ sent: true });
}
