import mongoose from 'mongoose';
import User from '../models/user_model';
import ProviderProfile from '../models/provider_model';
import { USER_TYPES } from '../../../../config/userTypes';
import validator from 'validator';
/**
 * POST /signup
 * Create a new local account
 */
 export function providerSignup(req, res, next) {
  const profile = new ProviderProfile({
    _id: new mongoose.Types.ObjectId(),
    brand_name: req.body.brand_name,
    email: req.body.email,
    telephone: req.body.telephone,
    address: req.body.address,
    tax_registration: req.body.tax_registration,
    bank_iban: req.body.bank_iban
  });

  User.findOne({ username: req.body.username }, (findErr, existingUser) => {
    if (existingUser) {
      return res.sendStatus(409);
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      user_role: USER_TYPES.Provider,
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

export function authorizeProvider(req, res, next) {
  const legalProvider = req.user && req.user.user_role === USER_TYPES.Provider && req.user.profile.locked === false;
  if (req.isAuthenticated() && legalProvider) {
    return next();
  }
  return res.sendStatus(401);
}

export function providerData(req, res) {
  const user = req.user;
  const data = {
    username: user.username,
    profile: user.profile
  };

  return res.send(data);
}


export function changeProfile(req, res, next) {
     const brand_name= req.body.brand_name;
     const email= req.body.email;
     const telephone= req.body.telephone;
     const address= req.body.address;
     const tax_registration= req.body.tax_registration;
	 const bank_iban= req.body.bank_iban;
	 const profileId = req.user.profile.id;
	 if (validator.isEmail(email) && telephone.length>7) {
	 ProviderProfile.findByIdAndUpdate(profileId, { $set: { "brand_name": brand_name, "email": email, "telephone": telephone, "address": address, "tax_registration": tax_registration, "bank_iban": bank_iban  } }, { new: true}, (err, profile) => {
      if (err) return next(err);
      const brand_nameUpdated = profile.brand_name;
	  const emailUpdated = profile.email;
	  const telephoneUpdated = profile.telephone;
	  const addressUpdated = profile.address;
	  const tax_registrationUpdated = profile.tax_registration;
	  const bank_ibanUpdated = profile.bank_iban;

      return res.send({ brand_name: brand_nameUpdated,  email: emailUpdated, telephone: telephoneUpdated, address: addressUpdated, tax_registration: tax_registrationUpdated, bank_iban: bank_ibanUpdated });
    }
  );
} else {
    return res.sendStatus(400);
  }

}


export default {
  providerSignup,
  authorizeProvider,
  providerData,
  changeProfile
};
