import { combineReducers } from 'redux';
import * as types from '../types/providerTypes';

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
    case types.PROVIDER_CHANGE_CREDENTIALS_SUCCESS:
      return {...state, username: action.message}
    case types.PROVIDER_CHANGE_CREDENTIALS:
    case types.PROVIDER_CHANGE_CREDENTIALS_FAILURE:
      return state;
    default:
      return state;
  }
}

const profile = (
  state = {  brand_name: '',
    email: '',
    telephone: '',
    address: '',
    tax_registration: '',
    bank_iban: '',},
  action
) => {
  switch (action.type){
    case types.PROVIDER_CHANGE_PROFILE_SUCCESS:
      return action.message
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
