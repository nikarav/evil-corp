import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

/*
 User Schema
 */
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  user_role: { type: String, require: true },
  tokens: Array,
  profile: { type: mongoose.Schema.Types.ObjectId, refPath: 'user_role' },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

function encryptPassword(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(5, (saltErr, salt) => {
    if (saltErr) return next(saltErr);
    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      return next();
    });
  });
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  }
};

/**
 * Statics
 */

UserSchema.statics = {};

export default mongoose.model('GlobalUser', UserSchema);
