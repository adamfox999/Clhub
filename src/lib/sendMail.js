import FormData from "form-data";
import Mailgun from "mailgun.js";

const mg = new Mailgun(FormData);

const mailgun = mg.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: "https://api.eu.mailgun.net", // Only use for EU domains!
});

export async function sendMail({ to, subject, text }) {
  const domain = process.env.MAILGUN_DOMAIN;
  await mailgun.messages.create(domain, {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
  });
}
