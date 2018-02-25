import passport from 'passport';
import { sendEmail } from '../controllers/emailController';

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.sendStatus(401);
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    const user_role = user.user_role;
    const username = user.username;
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.sendStatus(401);
      return res.status(200).send(
        {
          username,
          user_role
        }
      );
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  req.logout();
  res.sendStatus(200);
}

export function messageToPlatform(req, res, next) {
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  const emailBody = 'email: ' + email + '. \n ' + message;
  const mailOptions = {
    from: 'system@playground.com',
    to: 'admin@playground.com',
    text: emailBody,
    subject: subject,
  };
  sendEmail(mailOptions);
  return res.sendStatus(200);
}

export default {
  login,
  logout,
  messageToPlatform
};
