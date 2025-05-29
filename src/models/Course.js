import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  duration: String,
  memberPrice: Number,
  nonMemberPrice: Number,
  slots: Number,
  booked: { type: Number, default: 0 },
  customFields: [{ label: String, type: String, required: Boolean }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }
}, { collection: 'courses' });

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
