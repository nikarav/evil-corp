import mongoose from 'mongoose';
import User from '../models/user_model';
import ProviderProfile from '../models/provider_model';
import { sendEmail } from '../controllers/emailController';
import { USER_TYPES } from '../../../../config/userTypes';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';
;
/**
 * POST /signup
 * Create a new local account
 */
 export function providerSignup(req, res, next) {
  const formName = 'Forms.providerSignUp';
  let documentData = null;
  let mimetype = null;
  if (req.file) {
    documentData = req.file.buffer;
    mimetype = req.file.mimetype;
  }
  else {
    res.status(400).send('Please provide a legal document');
  }

  const brand_name = req.body[formName + '.brand_name'];
  const email = req.body[formName + '.email'];
  const telephone = req.body[formName + '.telephone'];
  const address = req.body[formName + '.address'];
  const tax_registration = req.body[formName + '.tax_registration'];
  const bank_iban = req.body[formName + '.bank_iban'];
  const username = req.body[formName + '.username'];
  const password = req.body[formName + '.password'];

  console.log({ username });

  const profile = new ProviderProfile({
    _id: new mongoose.Types.ObjectId(),
    brand_name,
    email,
    telephone,
    address,
    tax_registration,
    bank_iban,
    document: {
      data: documentData,
      contentType: mimetype
    }
  });

  User.findOne({ username }, (findErr, existingUser) => {
    if (existingUser) {
      return res.sendStatus(409);
    }

    const user = new User({
      username,
      password,
      user_role: USER_TYPES.Provider,
      profile: profile._id
    });

    return profile.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return user.save((_saveErr) => {
        if (_saveErr) return next(_saveErr);
        const emailBody = 'Καλησπέρα σας, ο λογαριασμός με όνομα χρήστη ' + username + ' στην πλατφόρμα PLAYGROUND χρειάζεται έγκριση.';
        const subject = 'Έγκριση Διοργανωτή Δραστηριοτήτων';
        const mailOptions = {
          from: 'system@playground.com',
          to: 'admin@playground.com',
          text: emailBody,
          subject: subject,
        };
        sendEmail(mailOptions);
        return res.sendStatus(200);
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
      var objForUpdate = {};
      if (req.body.brand_name) objForUpdate.brand_name = req.body.brand_name;
      if (req.body.email) objForUpdate.email = req.body.email;
      if (req.body.telephone) objForUpdate.telemphone = req.body.telephone;
      if (req.body.address) objForUpdate.address = req.body.address;
      if (req.body.tax_registration) objForUpdate.tax_registration = req.body.tax_registration;
      if (req.body.bank_iban) objForUpdate.bank_iban = req.body.bank_iban;

	 const profileId = req.user.profile.id;
	 if (!(req.body.email) || !(req.body.telephone) || validator.isEmail(req.body.email) && (req.body.telephone).length>7) {
	 ProviderProfile.findByIdAndUpdate(profileId, { $set: objForUpdate}, { new: true}, (err, profile) => {
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

const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

export function changeCredentials(req, res, next) {
  var objForUpdate = {};
  if (req.body.username) objForUpdate.username = req.body.username;
  if (req.body.password) {

  var hash = bcrypt.hashSync(req.body.password, salt);
  objForUpdate.password = hash;
  }
	const profileId=req.user.id;
	if(!(req.body.password) || (req.body.password).length > 3 ){
	User.findByIdAndUpdate(profileId, { $set: objForUpdate}, {new: true}, (err,profile) => {
	 if (err) return next(err);
	 const usernameUpdated = profile.username;
	 const passwordUpdated= profile.password;

	 return res.send({username: usernameUpdated, password: passwordUpdated});
	 }
	);
}  else {
     return res.sendStatus(400);
}

}

export function forgotPassword(req, res){
    User.findOne({ username: req.body.username }).populate('profile').exec((findErr, user) => {
        if (!user) {
          return res.status(404).send("Κανένας χρήστης δεν βρέθηκε με αυτό το όνομα");
        }
        const data = {
          email:user.profile.email,
          username:user.username
        };
        const emailBody = 'Καλησπέρα σας, ο λογαριασμός με όνομα χρήστη ' + data.username + ' στην πλατφόρμα PLAYGROUND έκανε αίτηση ανάκλησης κωδικού.';
        const subject = 'Ανάκληση κωδικού χρήστη στην πλατφόρμα PLAYGROUND';
        const mailOptions = {
          from: data.email,
          to: 'admin@playground.com',
          text: emailBody,
          subject: subject,
        };
        sendEmail(mailOptions);
        return res.sendStatus(200);
})
}

export function resetPassword(req, res, next){

   User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }).populate('profile').exec((err, user)=> {
     if (!user) {
       return res.status(404).send("To token έχει λήξει");
     }
     console.log(user);
     console.log(user.profile.email);
     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpires = undefined;

     user.save((_saveErr) => {
       if (_saveErr) return next(_saveErr);

     });


   var mailOptions = {
     from: 'admin@playground.com',
     to: user.profile.email,
     text: 'Καλησπέρα,\n\n' +
       'Επιβεβαίωση ότι ο κωδικός του χρήστη ' + user.username + ' έχει αλλάξει.\n',
     subject: 'Ο κωδικός έχει αλλάξει'
   };

      sendEmail(mailOptions);
      return res.sendStatus(200);
   });
}

export function getActivities(req, res, next) {
  const profileId = req.user.profile.id;
  ProviderProfile.findById(profileId).populate('activities').exec((err, profile) => {
    if (err) return next(err);
    return res.send(profile.activities);
  });
}

export function messageToPlatform(req, res, next) {
  const profileId = req.user.profile.id;
  const username = req.user.username;
  const subject = req.body.subject;
  const message = req.body.message;
  ProviderProfile.findById(profileId, (err, profile) => {
    if (err) return next(err);
    const email = profile.email;
    const emailBody = 'username: ' + username + '\n email: ' + email + '. \n ' + message;
    const mailOptions = {
      from: 'system@playground.com',
      to: 'admin@playground.com',
      text: emailBody,
      subject: subject,
    };
    sendEmail(mailOptions);
    return res.sendStatus(200);
 });
}

export default {
  providerSignup,
  authorizeProvider,
  providerData,
  changeProfile,
  changeCredentials,
  forgotPassword,
  resetPassword,
  getActivities,
  messageToPlatform
};
