import mongoose from 'mongoose';
import User from '../models/user_model';
import ParentProfile from '../models/parent_model';
import { USER_TYPES } from '../../../../config/userTypes';
import validator from 'validator';
/**
 * POST /signup
 * Create a new local account
 */
export function parentSignup(req, res, next) {
  const profile = new ParentProfile({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    telephone: req.body.telephone,
    address: req.body.address,
    birthday: req.body.birthday,
  });

  User.findOne({ username: req.body.username }, (findErr, existingUser) => {
    if (existingUser) {
      return res.sendStatus(409);
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      user_role: USER_TYPES.Parent,
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

export function authorizeParent(req, res, next) {
  const legalParent = req.user && req.user.user_role === USER_TYPES.Parent && req.user.profile.locked === false;
  if (req.isAuthenticated() && legalParent) {
    return next();
  }
  return res.sendStatus(401);
}

export function addCredits(req, res, next) {
  const credits = Number(req.body.credits);
  const profileId = req.user.profile.id;
  if (!isNaN(credits) && credits > 0) {
    ParentProfile.findByIdAndUpdate(profileId, { $inc: { credits } }, { new: true}, (err, profile) => {
      if (err) return next(err);
      const creditsUpdated = profile.credits;
      return res.send({ credits: creditsUpdated });
    }
  );
  } else {
    return res.sendStatus(400);
  }
}

export function getCredits(req, res, next) {
  const profileId = req.user.profile.id;
  ParentProfile.findById(profileId, (err, profile) => {
    if (err) return next(err);
    const credits = profile.credits;
    return res.send({ credits });
  }
);
}

export function parentData(req, res) {
  const user = req.user;
  const data = {
    username: user.username,
    profile: user.profile
  };

  return res.send(data);
}

export function changeProfile(req, res, next) {
  const name= req.body.name;
  const surname= req.body.surname;
  const email= req.body.email;
  const telephone= req.body.telephone;
  const address= req.body.address;
  const birthday= req.body.birthday;
	const profileId = req.user.profile.id;
	if (validator.isEmail(email) && telephone.length>7) {
	 ParentProfile.findByIdAndUpdate(profileId, { $set: { "name": name, "surname": surname, "email": email, "telephone": telephone, "address": address, "birthday": birthday  } }, { new: true}, (err, profile) => {
      if (err) return next(err);
      const nameUpdated = profile.name;
	    const surnameUpdated = profile.surname;
	    const emailUpdated = profile.email;
	    const telephoneUpdated = profile.telephone;
	    const addressUpdated = profile.address;
	    const birthdayUpdated = profile.birthday;

      return res.send({ name: nameUpdated, surname: surnameUpdated,  email: emailUpdated, telephone: telephoneUpdated, address: addressUpdated, birthday: birthdayUpdated });
    }
  );
} else {
    return res.sendStatus(400);
  }

}

export default {
  parentSignup,
  authorizeParent,
  parentData,
  addCredits,
  getCredits,
  changeProfile
};
