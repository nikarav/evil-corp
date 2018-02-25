import { combineReducers } from 'redux';
import * as types from '../types/parentTypes';
import {LOGIN_SUCCES_USER_USERNAME, LOGOUT_SUCCESS_UNSET_USERNAME} from '../types/userTypes';

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.GET_CREDITS:
    case types.GET_CREDITS_SUCCESS:
    case types.ADD_CREDITS:
    case types.ADD_CREDITS_SUCCESS:
    case types.PARENT_CHANGE_PROFILE:
    case types.PARENT_CHANGE_PROFILE_SUCCESS:
      return '';
    case types.GET_CREDITS_FAILURE:
    case types.ADD_CREDITS_FAILURE:
    case types.PARENT_CHANGE_CREDENTIALS_FAILURE:
      return action.message;
    default:
      return state;
  }
};

// maybe to fix add credits to profile?
const credits = (

  state = 0,
  action
) => {
  switch (action.type) {

    case types.GET_CREDITS:
    case types.ADD_CREDITS:
    case types.GET_CREDITS_FAILURE:
    case types.ADD_CREDITS_FAILURE:
      return state;
    case types.GET_CREDITS_SUCCESS:
    case types.ADD_CREDITS_SUCCESS:
      return action.message;
    default:
      return state;

  }
}

const username = (
  state = '',
  action
) => {
  switch (action.type){
    case LOGIN_SUCCES_USER_USERNAME:
      return action.message;
    case types.PARENT_GET_DATA_SUCCESS:
      return action.message.username;
    case types.PARENT_CHANGE_CREDENTIALS_SUCCESS:
      return {...state, username: action.message}
    case types.PARENT_CHANGE_CREDENTIALS:
    case types.PARENT_CHANGE_CREDENTIALS_FAILURE:
    case types.PARENT_CHANGE_CREDENTIALS:
    case types.PARENT_CHANGE_CREDENTIALS_FAILURE:
      return state;
    case LOGOUT_SUCCESS_UNSET_USERNAME:
      return '';
    default:
      return state;
  }
}


// to fix state add other fields for tickets
const profile = (
  state = {
    name: '',
    surname: '',
    email: '',
    telephone: '',
    address: '',
    birthday: '',
  },
  action
) => {
  switch (action.type){
    case types.PARENT_CHANGE_PROFILE_SUCCESS:
      return action.message
    case types.PARENT_GET_DATA_SUCCESS:
        return {...state, ...action.message.profile}
    case types.PARENT_CHANGE_PROFILE:
    case types.PARENT_CHANGE_PROFILE_FAILURE:
    case types.PROVIDER_GET_DATA:
    case types.PROVIDER_GET_DATA_FAILURE:
    return state;
  default:
    return state;
}
}


const parentReducer = combineReducers({
  credits,
  username,
  profile,
  message,
});


export default parentReducer;
