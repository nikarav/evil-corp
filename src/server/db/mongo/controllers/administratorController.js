import mongoose from 'mongoose';
import User from '../models/user_model';
import AdministratorProfile from '../models/administrator_model';
import { USER_TYPES } from '../../../../config/userTypes';
import validator from 'validator';
/**
 * POST /signup
 * Create a new local account
 */
export function administratorSignup(req, res, next) {
  const profile = new AdministratorProfile({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
  });

  User.findOne({ username: req.body.username }, (findErr, existingUser) => {
    if (existingUser) {
      return res.sendStatus(409);
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      user_role: USER_TYPES.Administrator,
      profile: profile._id
    });

    return profile.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return user.save((_saveErr) => {
        if (_saveErr) return next(_saveErr);
        return req.logIn(user, (loginErr) => {
          if (loginErr) return res.sendStatus(401);
          return res.sendStatus(200);
        });
      });
    });
  });
}

export function authorizeAdministrator(req, res, next) {
  const legalAdministrator = req.user && req.user.user_role === USER_TYPES.Administrator;
  if (req.isAuthenticated() && legalAdministrator) {
    return next();
  }
  return res.sendStatus(401);
}

export function changeEmail(req, res, next) {
  const email= req.body.email;
	const profileId = req.user.profile.id;
	if (validator.isEmail(email)) {
	 AdministratorProfile.findByIdAndUpdate(profileId, { $set: { "email": email } }, { new: true}, (err, profile) => {
      if (err) return next(err);
	    const emailUpdated = profile.email;

      return res.send({ email: emailUpdated });
    }
  );
} else {
    return res.sendStatus(400);
  }

}

export function administratorData(req, res) {
  const user = req.user;
  const data = {
    username: user.username,
    profile: user.profile
  };

  return res.send(data);
}

export default {
  administratorSignup,
  authorizeAdministrator,
  changeEmail,
  administratorData
};
