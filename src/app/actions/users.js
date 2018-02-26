import authService from '../services/authService';
import * as types from '../types/userTypes';
import { browserHistory } from 'react-router';

// LOGIN-LOGOUT set-unset USERNAME actions
function logInUserSetUsername(message){
  return {
    type: types.LOGIN_SUCCESS_USER_USERNAME,
    message
  }
}
function logInProviderSetUsername(message){
  return {
    type: types.LOGIN_SUCCESS_PROVIDER_USERNAME,
    message
  }
}
function logoutUnSetUsername(){
  return {
    type: types.LOGOUT_SUCCESS_UNSET_USERNAME,
  }
}

function logInAdministratorSetUsername(message){
  return {
    type: types.LOGIN_SUCCESS_ADMINISTRATOR_USERNAME,
    message
  }
}


// LOGIN actions
function beginLogin() {
  return { type: types.MANUAL_LOGIN };
}

function loginSuccessUser(message) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message
  };
}

function loginSuccessProvider(message) {
  return {
    type: types.LOGIN_SUCCESS_PROVIDER,
    message
  };
}

function loginSuccessAdministrator(message) {
  return {
    type: types.LOGIN_SUCCESS_ADMINISTRATOR,
    message
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR,
    message
  };
}

// LOGOUT actions
function beginLogout() {
  return { type: types.LOGOUT};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR };
}

// SIGNUP actions  --> **User** (Parents)
function signUpUserError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

function beginSignUpUser() {
  return { type: types.SIGNUP_USER };
}

function signUpUserSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
}

// SIGNUP actions  --> **Provider**
function signUpProviderError(message) {
  return {
    type: types.SIGNUP_ERROR_PROVIDER,
    message
  };
}

function beginSignUpProvider() {
  return { type: types.SIGNUP_PROVIDER };
}

function signUpProviderSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_PROVIDER,
    message
  };
}

// FORGOT actions
function beginForgot(message){
  return {
    type: types.FORGOT,
    message
  };
}

function forgotSuccess(message){
  return {
    type:types.FORGOT_SUCCESS,
    message
  };
}

function forgotError(message){
  return {
    type: types.FORGOT_ERROR,
    message
  }
}

// ---------------------------------- user triggered functions ---------------------------------------------------

// user triggerd function -> SIGNUP user
export function signUpUser(data) {
  return (dispatch) => {
    dispatch(beginSignUpUser());

    return authService().signUpUser(data)
      .then((response) => {
          dispatch(signUpUserSuccess('You have successfully registered an account as a PARENT!'));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(signUpUserError('Oops! Something went wrong when signing up as a PARENT'));
      });
  };
}

// user triggerd function -> SIGNUP provider
export function signUpProvider(data) {
  return (dispatch) => {
    dispatch(beginSignUpProvider());

    return authService().signUpProvider(data)
      .then((response) => {
          dispatch(signUpProviderSuccess('You have successfully registered an account as a PROVIDER!'));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(signUpProviderError('Oops! Something went wrong when signing up as a PROVIDER'));
      });
  };
}

// user triggerd function -> manual LOGIN
export function manualLogin(data) {
  return (dispatch) => {
    dispatch(beginLogin());

    return authService().logIn(data)
        .then((response) => {
            if (response.data.user_role == 'Parent'){
              dispatch(loginSuccessUser('You have been successfully logged in as a parent!'));
              dispatch(logInUserSetUsername(response.data.username));
            }
            else if (response.data.user_role == 'Provider') {
              dispatch(loginSuccessProvider('You have been successfully logged in as a parent'));
              dispatch(logInProviderSetUsername(response.data.username));
            }
            else if ( response.data.user_role == 'Administrator'){
              dispatch(loginSuccessAdministrator('You have been successfully logged in as a parent'));
              dispatch(logInAdministratorSetUsername(response.data.username));
              // dispatch

            } else
              console.log("Not supported type of login");
            //browserHistory.push('/');
        })
        .catch((err) => {
          dispatch(loginError('Oops! Invalid username or password'));
        });
  };
}

// user triggerd function -> logOut
export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());

    return authService().logOut()
      .then((response) => {
          dispatch(logoutSuccess());
          dispatch(logoutUnSetUsername());
      })
      .catch((err) => {
          dispatch(logoutError());
      });
  };
}


// user triggered function -> forgot
export function forgot(data){
  return (dispatch) => {
    dispatch(beginForgot('Starting forgot process'));
    return authService().forgot(data)
      .then((response) => {
        dispatch(forgotSuccess('You have success send an email to retrive your pass'));
      })
      .catch((err) => {
        dispatch(forgotError('failed forgot process'));
      })
  }
}
