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
