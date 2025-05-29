import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function POST(request) {
  const { amount } = await request.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'gbp',
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
