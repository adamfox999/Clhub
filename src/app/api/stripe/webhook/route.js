import stripe from '@/lib/stripe';
import Course from '@/models/Course';
import { sendMail } from '@/lib/sendMail';

export const config = { api: { bodyParser: false } };

export async function POST(req) {
  console.log('>>> Stripe webhook POST received');
  const sig = req.headers.get('stripe-signature');
  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook error:', err);
    return Response.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    console.log('>>> checkout.session.completed fired');
    const session = event.data.object;
    const { type, courseId } = session.metadata || {};
    const email = session.customer_details?.email;
    const stripeCustomerId = session.customer; // <-- The Stripe customer ID
    console.log('session.metadata:', session.metadata);
    console.log('session.customer_details:', session.customer_details);

    if (type === 'course' && courseId) {
      const course = await Course.findById(courseId);
      if (!course) {
        console.error('>>> Course not found for ID:', courseId);
      } else {
        // --- 1. Create Invoice Item ---
        try {
          await stripe.invoiceItems.create({
            customer: stripeCustomerId,
            amount: session.amount_total, // in pence/cents
            currency: session.currency || 'gbp',
            description: `Course Booking: ${course.title}`,
          });

          // --- 2. Create and Finalize Invoice (do not send to customer) ---
          const invoice = await stripe.invoices.create({
            customer: stripeCustomerId,
            auto_advance: true, // finalize
            // If you want to send, add: collection_method: 'send_invoice'
          });

          // If you DO want to send the invoice, uncomment this:
          // await stripe.invoices.sendInvoice(invoice.id);

          console.log('>>> Invoice created in Stripe for customer:', stripeCustomerId);

        } catch (invoiceErr) {
          console.error('>>> Stripe invoice creation failed:', invoiceErr);
        }

        // --- 3. Email Confirmation ---
        const text = `
Booking Confirmed: ${course.title}

Thank you for booking ${course.title}!

Date: ${new Date(course.date).toLocaleString()}
Duration: ${course.duration}
Description: ${course.description}
Amount paid: £${session.amount_total / 100}

We look forward to seeing you on the water!
Sailing School Team
        `;
        try {
          await sendMail({ to: email, subject: `Booking Confirmed: ${course.title}`, text });
          console.log('>>> Confirmation email sent to', email);
        } catch (err) {
          console.error('>>> sendMail failed:', err);
        }
      }
    } else {
      console.warn('>>> Type is not course or courseId missing:', type, courseId);
    }
  } else {
    console.log('>>> Event type not handled:', event.type);
  }

  return Response.json({ received: true });
}
