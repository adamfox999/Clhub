import { connectToDB } from '@/lib/mongodb';
import BoatSpace from '@/models/BoatSpace';

export async function GET() {
  try {
    await connectToDB();
    const data = await BoatSpace.find();
    return Response.json(data);
  } catch (err) {
    console.error('GET /api/boat-spaces failed:', err);
    return Response.json({ error: 'Failed to load boat spaces', details: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDB();
    const body = await request.json();

    const upserted = await BoatSpace.findByIdAndUpdate(
      body._id,
      { $set: body },
      { new: true, upsert: true }
    );
    return Response.json(upserted);
  } catch (err) {
    console.error('POST /api/boat-spaces failed:', err);
    return Response.json({ error: 'Failed to save boat space', details: err.message }, { status: 500 });
  }
}
