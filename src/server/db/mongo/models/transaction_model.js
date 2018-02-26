import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import { USER_TYPES } from '../../../../config/userTypes';

const TransactionsSchema = new mongoose.Schema({

  source : { type: String, required: true },
  destination : { type: String, required: true },
  value : { type: Number, required: true },
  state : { type: String, required: true },
  lastModified : Date

});

export default mongoose.model('Transactions',TransactionsSchema);
