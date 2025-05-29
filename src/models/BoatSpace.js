import mongoose from 'mongoose';

const BoatSpaceSchema = new mongoose.Schema({
  _id: String,
  lat: Number,
  lng: Number,
  status: {
    type: String,
    enum: ['available', 'occupied'],
    default: 'available'
  },
  billingContact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    default: null
  }
}, {
  collection: 'boat_spaces'
});

export default mongoose.models.BoatSpace || mongoose.model('BoatSpace', BoatSpaceSchema);
