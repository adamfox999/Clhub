import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function POST(request) {
  const {
    amount,           // integer, in pounds (e.g., 30 for £30)
    currency = 'gbp',
    description,      // e.g., "Sailing Course - RYA Level 1"
    userId,
    type,             // e.g., 'course', 'boat_space', 'membership', 'event', 'shop'
    metadata = {},    // any extra info (courseId, itemId, etc.)
    successUrl,       // (optional) override default
    cancelUrl         // (optional) override default
  } = await request.json();

  if (!amount || !description || !userId || !type) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency,
          product_data: { name: description },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      metadata: {
        userId,
        type,
        ...metadata
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
