import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: [Number], index: { type: '2dsphere', sparse: true }, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  photo: { data: Buffer, contentType: String },
  total_tickets: { type: Number, min: 0, required: true },
  available_tickets: { type: Number, min: 0 },
  min_age: { type: Number, min: 0, default: 0 },
  max_age: { type: Number, min: 0, max: 17, default: 17 },
  tags: [String],
  price: { type: Number, min: 0, required: true },
  locked: { type: Boolean, default: false } // true in case provider is locked
});

ActivitySchema.set('toJSON', { virtuals: true });
ActivitySchema.set('toObject', { virtuals: true });

/* ActivitySchema.pre('save', (next) => {
  const activity = this;
  if (!activity.isNew()) next();
  activity.available_tickets = activity.total_tickets;
  next();
});
 */
/* ActivitySchema.virtual('is_active').get(() =>
  Date.now() < this.date
);
 */
/* ActivitySchema.virtual('sold_tickets').get(() =>
  this.total_tickets - this.available_tickets
);
 */
export default mongoose.model('Activity', ActivitySchema);

