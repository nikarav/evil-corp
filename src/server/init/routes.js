/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
import activity_model from '../db/mongo/models/activity_model';

const userController = controllers && controllers.userController;
const parentController = controllers && controllers.parentController;
const providerController = controllers && controllers.providerController;
const administratorController = controllers && controllers.administratorController;
const activityController = controllers && controllers.activityController;
const ticketController = controllers && controllers.ticketController;

export default (app) => {
  // login routes
  if (userController) {
    app.post('/sessions', userController.login);
    app.delete('/sessions', userController.logout);
  } else {
    console.warn(unsupportedMessage('login routes'));
  }

  // parent routes
  if (parentController) {
    app.post('/parents', parentController.parentSignup);
    app.get('/parent', parentController.authorizeParent, parentController.parentData);
    app.get('/parent/credits', parentController.authorizeParent, parentController.getCredits);
    app.post('/parent/credits', parentController.authorizeParent, parentController.addCredits);
  } else {
    console.warn(unsupportedMessage('parent routes'));
  }

  // provider routes
  if (providerController) {
    app.post('/providers', providerController.providerSignup);
    app.get('/provider', providerController.authorizeProvider, providerController.providerData);
  } else {
    console.warn(unsupportedMessage('provider routes'));
  }

  if (ticketController) {
    app.post('/activity', activityController.postActivity);
  } else {
    console.warn(unsupportedMessage('ticket routes'));
  }

  // ticket routes
  if (ticketController) {
    app.post('/parent/ticket', ticketController.buyTicket);
  } else {
    console.warn(unsupportedMessage('ticket routes'));
  }
};
