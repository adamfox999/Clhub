import { connectToDB } from '@/lib/mongodb';
import ItemID from '@/models/ItemID';

export async function PATCH(request) {
  await connectToDB();
  const { id, contactId } = await request.json();

  try {
    // First, fetch the ItemID to check if it's already allocated
    const itemIdDoc = await ItemID.findById(id);

    if (!itemIdDoc) {
      return Response.json({ error: 'Item ID not found' }, { status: 404 });
    }

    // Check if already allocated
    if (itemIdDoc.contactId) {
      return Response.json({ error: 'Item ID already allocated to another contact' }, { status: 400 });
    }

    // Proceed to allocate
    itemIdDoc.status = 'allocated';
    itemIdDoc.contactId = contactId;
    await itemIdDoc.save();

    return Response.json(itemIdDoc);
  } catch (err) {
    return Response.json({ error: 'Failed to assign ID', details: err.message }, { status: 500 });
  }
}
