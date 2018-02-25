import mongoose from 'mongoose';
import { USER_TYPES } from '../../../../config/userTypes';

const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: [Number], index: { type: '2dsphere', sparse: true }, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  photo: { data: Buffer, contentType: String },
  total_tickets: { type: Number, min: 0, required: true },
  available_tickets: { type: Number, min: 0 },
  min_age: { type: Number, min: 3, default: 3 },
  max_age: { type: Number, min: 3, max: 16, default: 16 },
  tags: [String],
  price: { type: Number, min: 0, required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: USER_TYPES.Provider, require: true },
  locked: { type: Boolean, default: false } // true in case provider is locked
}, {
  toJSON: {
  virtuals: true
  },
  toObject: {
  virtuals: true
  }
});

ActivitySchema.virtual('is_active').get(function () {
  return Date.now() < this.date;
});

ActivitySchema.virtual('sold_tickets').get(function () {
  return this.total_tickets - this.available_tickets;
});

export default mongoose.model('Activity', ActivitySchema);
