/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'gact5OfphagCenUbIaj';

/* To make sure everything referencing the session ID knows what it is called */
export const sessionId = 'sid';

// Email credentials for https://ethereal.email/ email service
export const emailCredentials = {
  user: 'ix2wffeclf4e3njk@ethereal.email',
  pass: 'dM2Q8zu9bBxdMywHSW'
};
