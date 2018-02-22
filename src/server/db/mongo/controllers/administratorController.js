import mongoose from 'mongoose';
import User from '../models/user_model';
import AdministratorProfile from '../models/administrator_model';
import { sendEmail } from '../controllers/emailController';
import ParentProfile from '../models/parent_model';
import ProviderProfile from '../models/provider_model';
import Activity from '../models/activity_model';
import { USER_TYPES } from '../../../../config/userTypes';
import validator from 'validator';
import crypto from 'crypto';
import async from 'async';
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
          return res.status(200).send({ user_role: USER_TYPES.Administrator });
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

export function lockUnlockUser(req, res, next){
    const username = req.body.username;
    User.findOne({ username: username }, (findErr, existingUser) => {
      if (!existingUser) {
        return res.sendStatus(400);
      }
      const userProfile = existingUser;
      const role = userProfile.user_role;
      const profileId = userProfile.profile;
      const parent = role === USER_TYPES.Parent;
      const provider = role === USER_TYPES.Provider;
      if(parent) {
        ParentProfile.findById(profileId, (err, profile) => {
          if (err) return next(err);
          const lockedUpdated = !profile.locked;
          ParentProfile.findByIdAndUpdate(profileId, { $set: { "locked": lockedUpdated } }, { new: true}, (err, profile) => {
            if (err) return next(err);
          });
          const parentEmail = profile.email;
          if(lockedUpdated) {
            const emailBody = 'Καλησπέρα σας, ο λογαριασμός με όνομα χρήστη ' + username + ' στην πλατφόρμα PLAYGROUND έχει κλειδωθεί.';
            const subject = 'Κλείδωμα χρήστη στην πλατφόρμα PLAYGROUND';
            const mailOptions = {
              from: 'admin@playground.com',
              to: parentEmail,
              text: emailBody,
              subject: subject,
            };
            sendEmail(mailOptions);
          }
          else {
            const emailBody = 'Καλησπέρα σας, ο λογαριασμός με όνομα χρήστη ' + username + ' στην πλατφόρμα PLAYGROUND έχει ξεκλειδωθεί.';
            const subject = 'Ξεκλείδωμα χρήστη στην πλατφόρμα PLAYGROUND';
            const mailOptions = {
              from: 'admin@playground.com',
              to: parentEmail,
              text: emailBody,
              subject: subject,
            };
            sendEmail(mailOptions);
          }
          return res.send({ locked: lockedUpdated });
        });
     }
     else if (provider) {
       ProviderProfile.findById(profileId, (err, profile) => {
         if (err) return next(err);
         const lockedUpdated = !profile.locked;
         ProviderProfile.findByIdAndUpdate(profileId, { $set: { "locked": lockedUpdated } }, { new: true}, (err, profile) => {
           if (err) return next(err);
         });
         const activities = profile.activities;
         const arrayLength = activities.length;
         for (var i = 0; i < arrayLength; i++) {
            var activityId = activities[i];
            Activity.findByIdAndUpdate(activityId,  { $set: { "locked": lockedUpdated } }, { new: true}, (err, profile) => {
              if (err) return next(err);
            });
         }
         const providerEmail = profile.email;
         if(lockedUpdated){
           const emailBody = 'Καλησπέρα σας, ο λογαριασμός με όνομα χρήστη ' + username + ' στην πλατφόρμα PLAYGROUND έχει κλειδωθεί.';
           const subject = 'Κλείδωμα χρήστη στην πλατφόρμα PLAYGROUND';
           const mailOptions = {
             from: 'admin@playground.com',
             to: providerEmail,
             text: emailBody,
             subject: subject,
           };
           sendEmail(mailOptions);
         }
         else{
           const emailBody = 'Καλησπέρα σας, ο λογαριασμός με όνομα χρήστη ' + username + ' στην πλατφόρμα PLAYGROUND έχει ξεκλειδωθεί.';
           const subject = 'Ξεκλείδωμα χρήστη στην πλατφόρμα PLAYGROUND';
           const mailOptions = {
             from: 'admin@playground.com',
             to: providerEmail,
             text: emailBody,
             subject: subject,
           };
           sendEmail(mailOptions);
         }
       return res.send({ locked: lockedUpdated });
       });
     }
     else{
      return res.sendStatus(400);
     }
    });
}

export function checkIfLocked(req, res, next){
    const username = req.body.username;
    User.findOne({ username: username }, (findErr, existingUser) => {
      if (!existingUser) {
        return res.sendStatus(400);
      }
      const userProfile = existingUser;
      const role = userProfile.user_role;
      const profileId = userProfile.profile;
      const parent = role === USER_TYPES.Parent;
      const provider = role === USER_TYPES.Provider;
      if(parent) {
        ParentProfile.findById(profileId, (err, profile) => {
          if (err) return next(err);
          const locked = profile.locked;
          return res.send({ locked: locked });
        });
     }
     else if (provider) {
       ProviderProfile.findById(profileId, (err, profile) => {
         if (err) return next(err);
         const locked = profile.locked;
         return res.send({ locked: locked });
       });
     }
     else{
       return res.sendStatus(400);
     }
    });
}

export function approveProvider(req, res, next){
    const username = req.body.username;
    User.findOne({ username: username }, (findErr, existingUser) => {
      if (!existingUser) {
        return res.sendStatus(400);
      }
      const userProfile = existingUser;
      const role = userProfile.user_role;
      const profileId = userProfile.profile;
      const provider = role === USER_TYPES.Provider;
      if (provider) {
        ProviderProfile.findByIdAndUpdate(profileId, { $set: { "locked": false, "activated": true } }, { new: true}, (err, profile) => {
          if (err) return next(err);
          const lockedUpdated = profile.locked;
          const activatedUpdated = profile.activated;
          //return res.send({ locked: lockedUpdated });
          const providerEmail = profile.email;
          const emailBody = 'Καλησπέρα σας, ο λογαριασμός με όνομα χρήστη ' + username + ' στην πλατφόρμα PLAYGROUND έχει ενεργοποιηθεί.';
          const mailOptions = {
            from: 'admin@playground.com',
            to: providerEmail,
            text: emailBody,
            subject: 'ΕΓΓΡΑΦΗ ΣΤΗΝ ΠΛΑΤΦΟΡΜΑ PLAYGROUND',
          };
          sendEmail(mailOptions);
          return res.send({ activated: activatedUpdated });
        });
      }
      else {
        return res.sendStatus(400);
      }
     });
}

export function rejectProvider(req, res, next){
    const username = req.body.username;
    User.findOne({ username: username }, (findErr, existingUser) => {
      if (!existingUser) {
        return res.sendStatus(400);
      }
      const userProfile = existingUser;
      const role = userProfile.user_role;
      const profileId = userProfile.profile;
      const provider = role === USER_TYPES.Provider;
      if (provider) {
        ProviderProfile.findById(profileId, (err, profile) => {
          if (err) return next(err);
          const activated = profile.activated;
          if(!activated){
            ProviderProfile.findByIdAndRemove(profileId, (err, profile) => {
              if (err) return next(err);
            });
            const profileIdNew = userProfile._id;
            User.findByIdAndRemove(profileIdNew, (err, profile) => {
              if (err) return next(err);
            });
            return res.sendStatus(200);
          }
          else{
            return res.sendStatus(400);
          }
        });
      }
      else{
        return res.sendStatus(400);
      }
     });
}

export function forgotPassword(req, res, next){

  var buf=crypto.randomBytes(20)
  var token = buf.toString('hex');

    User.findOne({ username: req.body.username }).populate('profile').exec((findErr, user) => {
      if (!user) {
        return res.status(404).send("Κανένας χρήστης δεν βρέθηκε με αυτό το όνομα");
      }
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      user.save(function(err) {
          if (err) return next(err);
      });
    if(user.user_role=="Parent"){
      var emailBody= 'Με αυτό το μέιλ γίνεται ανάκληση κωδικού χρήστη.\n\n' +
        'Κάντε κλικ σε αυτό τον σύνδεσμο η αντιγράψτε το στον φυλλομετρητή σας\n\n' +
        'http://' + req.headers.host + '/parent/reset/' + token + '\n\n'
    }

    else {
      var emailBody= 'Με αυτό το μέιλ γίνεται ανάκληση κωδικού χρήστη.\n\n' +
        'Κάντε κλικ σε αυτό τον σύνδεσμο η αντιγράψτε το στον φυλλομετρητή σας\n\n' +
        'http://' + req.headers.host + '/provider/reset/' + token + '\n\n'

    }


    const mailOptions = {
      from: 'admin@playground.com',
      to: user.profile.email,
      text: emailBody,
      subject: 'Ανάκληση κωδικού χρήστη'
    };
      sendEmail(mailOptions);
      return res.sendStatus(200);
    });
  }

  export function userData(req, res, next) {
    const username = req.body.username;
    User.findOne({ username: username }, (findErr, existingUser) => {
      if (!existingUser) {
        return res.sendStatus(400);
      }
      const userProfile = existingUser;
      const role = userProfile.user_role;
      const profileId = userProfile.profile;
      const parent = role === USER_TYPES.Parent;
      const provider = role === USER_TYPES.Provider;
      if(parent) {
        ParentProfile.findById(profileId, (err, profile) => {
          if (err) return next(err);
          return res.send({ profile });
        });
     }
     else if (provider) {
       ProviderProfile.findById(profileId, (err, profile) => {
         if (err) return next(err);
         return res.send({ profile });
       });
     }
     else{
       return res.sendStatus(400);
     }
    });
  }

export default {
  administratorSignup,
  authorizeAdministrator,
  changeEmail,
  administratorData,
  lockUnlockUser,
  checkIfLocked,
  approveProvider,
  rejectProvider,
  forgotPassword,
  userData
};
