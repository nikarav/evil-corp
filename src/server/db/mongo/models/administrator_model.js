import mongoose from 'mongoose';
import { USER_TYPES } from '../../../../config/userTypes';

/*
 Administrator Schema
 */
const AdministratorProfileSchema = new mongoose.Schema({
  email: { type: String, required: true },
});

export default mongoose.model(USER_TYPES.Administrator, AdministratorProfileSchema);
