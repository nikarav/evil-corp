/**
 * Routes for express app
 */
import passport from 'passport';
import multer from 'multer';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
import activity_model from '../db/mongo/models/activity_model';
import administrator_model from '../db/mongo/models/administrator_model';

const userController = controllers && controllers.userController;
const parentController = controllers && controllers.parentController;
const providerController = controllers && controllers.providerController;
const administratorController = controllers && controllers.administratorController;
const activityController = controllers && controllers.activityController;
const ticketController = controllers && controllers.ticketController;

const upload = multer();

export default (app) => {
  // login routes
  if (userController) {
    app.post('/api/sessions', userController.login);
    app.delete('/api/sessions', userController.logout);
    app.post('/api/user/sendMessage', userController.messageToPlatform);
  } else {
    console.warn(unsupportedMessage('login routes'));
  }

  // parent routes
  if (parentController) {
    app.post('/api/parents', parentController.parentSignup);
    app.post('/api/parent/forgot', parentController.forgotPassword);
    app.get('/api/parent', parentController.authorizeParent, parentController.parentData);
    app.get('/api/parent/credits', parentController.authorizeParent, parentController.getCredits);
    app.post('/api/parent/credits', parentController.authorizeParent, parentController.addCredits);
    app.post('/api/parent/changeProfile', parentController.authorizeParent, parentController.changeProfile);
    app.post('/api/parent/changeCredentials', parentController.authorizeParent, parentController.changeCredentials);
    app.post('/api/parent/reset/:token', parentController.resetPassword);
    app.post('/api/parent/sendMessage', parentController.authorizeParent, parentController.messageToPlatform);

  } else {
    console.warn(unsupportedMessage('parent routes'));
  }

  // provider routes
  if (providerController) {
    app.post('/api/providers', providerController.providerSignup);
    app.post('/api/provider/forgot', providerController.forgotPassword);
    app.get('/api/provider', providerController.authorizeProvider, providerController.providerData);
    app.post('/api/provider/changeProfile', providerController.authorizeProvider, providerController.changeProfile);
    app.post('/api/provider/changeCredentials', providerController.authorizeProvider, providerController.changeCredentials);
    app.post('/api/provider/reset/:token', providerController.resetPassword);
    app.get('/api/provider/activities', providerController.authorizeProvider, providerController.getActivities);
    app.post('/api/provider/sendMessage', providerController.authorizeProvider ,providerController.messageToPlatform);
  } else {
    console.warn(unsupportedMessage('provider routes'));
  }

  if (administratorController) {
    app.post('/api/administrators', administratorController.administratorSignup);  // only for backend
    app.get('/api/administrator', administratorController.authorizeAdministrator, administratorController.administratorData);
    app.post('/api/administrator/lockUnlockUser', administratorController.lockUnlockUser);
    app.post('/api/administrator/checkIfLocked', administratorController.checkIfLocked);
    app.post('/api/administrator/changeEmail', administratorController.authorizeAdministrator, administratorController.changeEmail);
    app.post('/api/administrator/approveProvider', administratorController.approveProvider);
    app.post('/api/administrator/rejectProvider', administratorController.rejectProvider);
    app.post('/api/administrator/forgot', administratorController.forgotPassword);
    app.post('/api/administrator/userData', administratorController.userData);
    app.get('/api/administrator/providersForApproval', administratorController.providersForApproval);
  } else {
    console.warn(unsupportedMessage('administrator routes'));
  }

  if (userController) {
    app.post('/api/login', userController.login);
  } else {
    console.warn(unsupportedMessage('user routes'));
  }

  if (activityController) {
    app.post('/api/activity', providerController.authorizeProvider, upload.single('Forms.newActivity.photo'), activityController.postActivity);
    app.get('/api/activities', activityController.getAllActivities);
    app.get('/api/activity/:activityId', activityController.getActivity);
    app.get('/api/activity/:activityId/photo', activityController.getActivityPhoto);
  } else {
    console.warn(unsupportedMessage('ticket routes'));
  }

  // ticket routes
  if (ticketController) {
    app.post('/api/parent/ticket/buy', parentController.authorizeParent, ticketController.buyTicket);
    app.get('/api/parent/ticket/:ticketId/pdf/', parentController.authorizeParent, ticketController.generateAndEmailPdf);
  } else {
    console.warn(unsupportedMessage('ticket routes'));
  }
};
