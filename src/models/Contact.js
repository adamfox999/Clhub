import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
  role: { type: String, enum: ['member', 'admin'], default: 'member' },
  createdAt: { type: Date, default: Date.now },
  stripeCustomerId: { type: String, default: null }
}, {
  collection: 'contacts'
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
