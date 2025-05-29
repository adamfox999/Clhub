import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);
  return NextResponse.json({
    status: session.status,
    customer_email: session.customer_details?.email || '',
  });
}
