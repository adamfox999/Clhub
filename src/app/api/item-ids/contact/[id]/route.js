import { connectToDB } from '@/lib/mongodb';
import ItemID from '@/models/ItemID';

export async function GET(request) {
  await connectToDB();

  const { pathname } = new URL(request.url);
  const contactId = pathname.split('/').pop();

  try {
    const contactItemIds = await ItemID.find({
      contactId,
      status: 'allocated',
      itemRef: null
    });
    return Response.json(contactItemIds);
  } catch (err) {
    return Response.json({ error: 'Failed to fetch contact IDs', details: err.message }, { status: 500 });
  }
}
