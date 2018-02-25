import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import { USER_TYPES } from '../../../../config/userTypes';

/*
 Provider Profile Schema
 */
const ProviderProfileSchema = new mongoose.Schema({
  brand_name: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  tax_registration: { type: String, required: true },
  document: {data: Buffer, contentType: String},
  bank_iban: { type: String, required: true },
  locked: { type: Boolean, default: true },
  activated: { type: Boolean, default: false },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
});

export default mongoose.model(USER_TYPES.Provider, ProviderProfileSchema);
