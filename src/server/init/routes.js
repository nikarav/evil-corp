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
    app.post('/api/sessions', userController.login);
    app.delete('/api/sessions', userController.logout);
  } else {
    console.warn(unsupportedMessage('login routes'));
  }

  // parent routes
  if (parentController) {
    app.post('/api/parents', parentController.parentSignup);
    app.get('/api/parent', parentController.authorizeParent, parentController.parentData);
    app.get('/api/parent/credits', parentController.authorizeParent, parentController.getCredits);
    app.post('/api/parent/credits', parentController.authorizeParent, parentController.addCredits);
    app.post('/api/parent/changeProfile', parentController.authorizeParent, parentController.changeProfile);
  } else {
    console.warn(unsupportedMessage('parent routes'));
  }

  // provider routes
  if (providerController) {
    app.post('/api/providers', providerController.providerSignup);
    app.get('/api/provider', providerController.authorizeProvider, providerController.providerData);
    app.post('/api/provider/changeProfile',providerController.authorizeProvider, providerController.changeProfile);
  } else {
    console.warn(unsupportedMessage('provider routes'));
  }

  if (activityController) {
    app.post('/api/activity', activityController.postActivity);
  } else {
    console.warn(unsupportedMessage('ticket routes'));
  }

  // ticket routes
  if (ticketController) {
    app.post('/api/parent/ticket', ticketController.buyTicket);
  } else {
    console.warn(unsupportedMessage('ticket routes'));
  }
};
