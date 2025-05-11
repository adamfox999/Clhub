import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ['Boat', 'Launch Trolley', 'Road Trailer', 'Kayak', 'Other'],
    required: true
  },
  class: {
    type: String, // e.g. 'Laser', 'RS Feva', etc.
  },
  sailNumber: {
    type: String,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  itemId: {
    type: String,
    required: true,
    unique: true
  },
  locationId: {
    type: String,
    ref: 'BoatSpace',
  },
  billingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  }
}, {
  collection: 'items',
  timestamps: true
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
