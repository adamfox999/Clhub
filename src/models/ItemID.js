import mongoose from 'mongoose';

const ItemIDSchema = new mongoose.Schema({
  _id: String,
  status: {
    type: String,
    enum: ['unallocated', 'allocated', 'archived'],
    default: 'unallocated'
  },
  itemRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    default: null
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    default: null
  },
  notes: String
}, {
  collection: 'item_ids'
});

export default mongoose.models.ItemID || mongoose.model('ItemID', ItemIDSchema);
