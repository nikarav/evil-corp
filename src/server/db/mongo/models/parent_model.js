import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import { USER_TYPES } from '../../../../config/userTypes';

/*
 Parent Profile Schema
 */
const ParentProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  birthday: Date,
  credits: { type: Number, default: 0, min: 0},
  locked: { type: Boolean, default: false },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', default: [] }],
  numberOfTickets: { type: Number, default: 0, min: 0},
  pendingTransactions: [{ type: mongoose.Schema.Types.ObjectId, default: [] }]
});

export default mongoose.model(USER_TYPES.Parent, ParentProfileSchema);
