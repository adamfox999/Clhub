import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function POST(request) {
  const { amount, description, metadata = {}, customerId } = await request.json();

  if (!amount || !description || !customerId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'custom',
      payment_method_types: ['card'],
      currency: 'gbp',
      customer: customerId, // <-- Always include this!
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: { name: description },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
