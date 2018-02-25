import User from '../models/user_model';
import { USER_TYPES } from '../../../../config/userTypes';

export default (req, username, password, done) => {
  User.findOne({ username }).populate('profile').exec((findErr, user) => {
    if (!user) return done(null, false, { message: `There is no record of the username ${username}.` });
    const isAdmin = user.profile.user_role === USER_TYPES.Administrator;
    if (!isAdmin && user.profile.locked === true) {
      return done(null, false, { message: 'Your account is locked.' });
    }
    return user.comparePassword(password, (passErr, isMatch) => {
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Your username or password combination is not correct.' });
    });
  });
};
