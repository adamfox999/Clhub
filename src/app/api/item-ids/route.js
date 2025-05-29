import { connectToDB } from '../../../lib/mongodb';
import ItemID from '../../../models/ItemID';

export async function GET() {
  await connectToDB();
  const available = await ItemID.find({ status: 'unallocated' });
  return Response.json(available);
}

export async function PATCH(req) {
  await connectToDB();
  const { id, itemRef } = await req.json();

  try {
    const updated = await ItemID.findByIdAndUpdate(
      id,
      { status: 'allocated', itemRef },
      { new: true }
    );
    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: 'Failed to allocate ID', details: err.message }, { status: 500 });
  }
}
