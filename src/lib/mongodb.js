import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

// ✅ For Mongoose-based routes
export async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

// ✅ For NextAuth MongoDBAdapter
const client = new MongoClient(uri);
const clientPromise = client.connect();
export default clientPromise;
