import { connectToDB } from '@/lib/mongodb';
import BoatSpace from '@/models/BoatSpace';

export async function PATCH(request, { params }) {
  await connectToDB();

  const { billingContact } = await request.json();
  const spaceId = params.id;

  try {
    const updated = await BoatSpace.findByIdAndUpdate(
      spaceId,
      { billingContact },
      { new: true }
    );

    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: 'Failed to update billing contact', details: err.message }, { status: 500 });
  }
}
