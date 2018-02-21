import { combineReducers } from 'redux';
import * as types from '../types';

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT:
    case types.LOGIN_SUCCESS_USER:
    case types.LOGIN_SUCCESS_PROVIDER:
    case types.SIGNUP_SUCCESS_USER:
      return '';
    case types.LOGIN_ERROR:
    case types.SIGNUP_ERROR_USER:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.MANUAL_LOGIN:
    case types.SIGNUP_USER:
    case types.SIGNUP_PROVIDER:
    case types.LOGOUT:
      return true;
    case types.LOGIN_SUCCESS_PARENT:
    case types.LOGIN_SUCCESS_PROVIDER:
    case types.SIGNUP_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_PROVIDER:
    case types.LOGOUT_SUCCESS:
    case types.LOGIN_ERROR:
    case types.SIGNUP_ERROR_USER:
    case types.SIGNUP_ERROR_PROVIDER:
    case types.LOGOUT_ERROR:
      return false;
    default:
      return state;
  }
};

const authenticated_user = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:       // auto log in on sign up
    case types.LOGOUT_ERROR:
      return true;
    case types.LOGIN_ERROR:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
};

const authenticated_provider = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_PROVIDER:
    case types.LOGOUT_ERROR:
      return true;
    case types.SIGNUP_SUCCESS_PROVIDER:       // NO auto log in on sign up
    case types.LOGIN_ERROR:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  isWaiting,
  authenticated_user,
  authenticated_provider,
  message
});

export default userReducer;
