import { renderMJMLTemplate } from './sendMail';

// Loads and fills in one specific template:
export async function getCourseBookingConfirmation({ course, amount }) {
  const html = await renderMJMLTemplate(
    'src/emails/course_booking_confirmation.mjml',
    {
      title: course.title,
      date: new Date(course.date).toLocaleString(),
      duration: course.duration,
      description: course.description,
      amount: amount.toFixed(2)
    }
  );
  const subject = `Booking Confirmed: ${course.title}`;
  const text = `Thank you for booking ${course.title}!\n\nDate: ${new Date(course.date).toLocaleString()}\nAmount paid: £${amount}\n...`;
  return { subject, text, html };
}

export async function getBoatSpaceConfirmation({ spaceId, amount }) {
  const html = await renderMJMLTemplate(
    'src/emails/boat_space_confirmation.mjml',
    {
      spaceId,
      amount: amount.toFixed(2)
    }
  );
  const subject = `Boat Park Update`;
  const text = `Your boat park payment has been received.\n\nSpace ID: ${spaceId}\nAmount: £${amount}\n...`;
  return { subject, text, html };
}

// Add more for other email types!

// Food order confirmation email
import fs from 'fs/promises';
import path from 'path';

export async function getFoodOrderConfirmation({ order, manageLink }) {
  const templatePath = path.resolve(process.cwd(), 'src/emails/food_order_confirmation.txt');
  let template = await fs.readFile(templatePath, 'utf8');

  // Fill template variables
  template = template
    .replace(/{{orderNumber}}/g, order.order_number.toString().padStart(4, '0'))
    .replace(/{{requestedTime}}/g, new Date(order.requested_time).toLocaleString())
    .replace(/{{total}}/g, order.total.toFixed(2))
    .replace(/{{notes}}/g, order.notes || '')
    .replace(/{{manageLink}}/g, manageLink)
    .replace(/{{items}}/g, order.items.map(item => `- ${item.name} x${item.quantity} (£${item.price.toFixed(2)})`).join('\n'));

  const subject = `Food Order Confirmed: #${order.order_number.toString().padStart(4, '0')}`;
  const text = template;
  return { subject, text };
}
