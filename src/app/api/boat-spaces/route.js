import { connectToDB } from '../../../lib/mongodb';
import mongoose from 'mongoose';

const BoatSpaceSchema = new mongoose.Schema({
  _id: String,
  status: String,
  lat: Number,
  lng: Number
}, {
  collection: 'boat_spaces'
});

const BoatSpace = mongoose.models.BoatSpace || mongoose.model('BoatSpace', BoatSpaceSchema);

export async function GET() {
  await connectToDB();
  const data = await BoatSpace.find();
  return Response.json(data);
}

export async function POST(request) {
  await connectToDB();
  const body = await request.json();

  try {
    const upserted = await BoatSpace.findByIdAndUpdate(
      body._id,
      { $set: body },
      { new: true, upsert: true }
    );
    return Response.json(upserted);
  } catch (err) {
    return Response.json({ error: 'Failed to save boat space', details: err.message }, { status: 500 });
  }
}
