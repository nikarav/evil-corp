import authService from '../authService';
import * as types from '../types';

// LOGIN actions
export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

function beginLogin() {
  return { type: types.MANUAL_LOGIN };
}

function loginSuccess(message) {
  return {
    type: types.LOGIN_SUCCESS,
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

// ---------------------------------- user triggered functions ---------------------------------------------------

// user triggerd function -> signUp
export function signUpUser(data) {
  return (dispatch) => {
    dispatch(beginSignUpUser());

    return authService().signUpUser(data)
      .then((response) => {
          dispatch(signUpUserSuccess('You have successfully registered an account as a PARENT!'));
        //dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(signUpUserError('Oops! Something went wrong when signing up as a PARENT'));
      });
  };
}

// user triggerd function -> signUp
export function signUpProvider(data) {
  return (dispatch) => {
    dispatch(beginSignUpProvider());

    return authService().signUpProvider(data)
      .then((response) => {
          dispatch(signUpProviderSuccess('You have successfully registered an account as a PROVIDER!'));
        //dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(signUpProviderError('Oops! Something went wrong when signing up as a PROVIDER'));
      });
  };
}

// user triggerd function -> manual login
export function manualLogin(data) {
  return (dispatch) => {
    dispatch(beginLogin());

    return authService().logIn(data)
      .then((response) => {
          dispatch(loginSuccess('You have been successfully logged in'));
          //dispatch(push('/'));
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
      })
      .catch((err) => {
        dispatch(logoutError());
      });
  };
}
