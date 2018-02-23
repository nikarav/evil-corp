import mongoose from 'mongoose';
import { USER_TYPES } from '../../../../config/userTypes';

const TicketSchema = new mongoose.Schema({
  ticketNumber: String,
  activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: USER_TYPES.Parent, require: true },
  purchaseDate: { type: Date, default: Date.now },
  numberOfTickets: { type: Number, min: 0}
});

export default mongoose.model('Ticket', TicketSchema);
