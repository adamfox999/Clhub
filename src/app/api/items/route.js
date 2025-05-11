import { connectToDB } from '../../../lib/mongodb';
import Item from '../../../models/Item';
import Contact from '../../../models/Contact'; // ✅ Required and must assign to a variable




export async function GET() {
  await connectToDB();
  const items = await Item.find().populate('ownerId billingId');
  return Response.json(items);
}

export async function POST(request) {
  await connectToDB();
  const body = await request.json();

  const newItem = await Item.create(body);
  return Response.json(newItem);
}
