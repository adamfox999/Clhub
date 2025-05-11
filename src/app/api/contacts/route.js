import { connectToDB } from '../../../lib/mongodb';
import Contact from '../../../models/Contact';

export async function GET() {
  await connectToDB();
  const contacts = await Contact.find();
  return Response.json(contacts);
}
