import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import Contact from '@/models/Contact';
import { connectToDB } from '@/lib/mongodb';

export async function POST(req) {
  const { userId } = await req.json();
  await connectToDB();

  // 1. Find the user in your database
  const user = await Contact.findById(userId);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // 2. If user already has a Stripe customer, return it
  if (user.stripeCustomerId) {
    return NextResponse.json({ stripeCustomerId: user.stripeCustomerId });
  }

  // 3. Otherwise, create a new Stripe customer and save to MongoDB
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
  });
  user.stripeCustomerId = customer.id;
  await user.save();

  return NextResponse.json({ stripeCustomerId: customer.id });
}
