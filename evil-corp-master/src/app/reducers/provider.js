import { combineReducers } from 'redux';
import * as types from '../types/providerTypes';
import {LOGIN_SUCCES_PROVIDER_USERNAME, LOGOUT_SUCCESS_UNSET_USERNAME} from '../types/userTypes';

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.PROVIDER_CHANGE_PROFILE:
    case types.PROVIDER_CHANGE_PROFILE_SUCCESS:
      return '';
    case types.PROVIDER_CHANGE_CREDENTIALS_FAILURE:
      return action.message;
    default:
      return state;
  }
};

const username = (
  state = '',
  action
) => {
  switch (action.type){
    case LOGIN_SUCCES_PROVIDER_USERNAME:
      return action.message;
    case types.PROVIDER_GET_DATA_SUCCESS:
      return action.message.username;
    case types.PROVIDER_CHANGE_CREDENTIALS_SUCCESS:
      return {...state, username: action.message}
    case types.PROVIDER_GET_DATA:
    case types.PROVIDER_GET_DATA_FAILURE:
    case types.PROVIDER_CHANGE_CREDENTIALS:
    case types.PROVIDER_CHANGE_CREDENTIALS_FAILURE:
      return state;
    case LOGOUT_SUCCESS_UNSET_USERNAME:
        return '';
    default:
      return state;
  }
}

const profile = (
  state = {
    activities: [],
    address: '',
    brand_name: '',
    email: '',
    telephone: '',
    address: '',
    tax_registration: '',
    bank_iban: '',},    // not using the activated & locked field from backend
  action
) => {
  switch (action.type){
    case types.PROVIDER_CHANGE_PROFILE_SUCCESS:
      return action.message
    case types.PROVIDER_GET_DATA_SUCCESS:
      return {...state, ...action.message.profile}
    case types.PROVIDER_GET_DATA:
    case types.PROVIDER_GET_DATA_FAILURE:
    case types.PROVIDER_CHANGE_PROFILE:
    case types.PROVIDER_CHANGE_PROFILE_FAILURE:
    return state;
  default:
    return state;
}
}


const providerReducer = combineReducers({
  username,
  profile,
  message,
});


export default providerReducer;
