import { combineReducers } from 'redux';
import * as types from '../types/administratorTypes';

const profile = (
  state = {
    username: '',
    email: '',
    providers: []
  },
  action
) => {
  switch (action.type){
    case types.ADMIN_PROVIDERS_FOR_APPROVAL_SUCCESS:
      return {...state, providers: action.message}
    case types.ADMIN_CHANGE_EMAIL_SUCCESS:
      return {...state, email: action.message.email};
    case types.LOGIN_SUCCESS_ADMINISTRATOR_USERNAME:
      return  action.message.username;
    case types.LOGOUT_SUCCESS_UNSET_USERNAME:
      return {...state, username: ''};
    case types.ADMIN_GET_DATA_SUCCESS:
        return {...state, username: action.message.username, email: action.message.profile.email}
    case types.APROVE_REJECT_PROVIDER_SUCCESS:
        return {...state, providers: state.providers.filter(item => action.message !== item.username)}
    case types.ADMIN_GET_DATA_FAILURE:
    case types.ADMIN_GET_DATA:
    case types.ADMIN_CHANGE_EMAIL_FAILURE:
    case types.ADMIN_CHANGE_EMAIL:
    case types.ADMIN_PROVIDERS_FOR_APPROVAL:
    case types.ADMIN_PROVIDERS_FOR_APPROVAL_FAILURE:
    case types.APROVE_REJECT_PROVIDER:
    case types.APROVE_REJECT_PROVIDER_FAILURE:
    return state;
  default:
    return state;
}
}

const userData = (
  state = {
    role: '',
    parentData: {
      name: '',
       surname: '',
       email: '',
       telephone: '',
       address: '',
       birthday: '',
       numberOfTickets: '',
    },
    providerData: {
      brand_name: '',
      email:    '',
      telephone:  '',
      address:  '',
      tax_registration: '',
      bank_iban: '',
    }
  },
  action
) => {
  switch (action.type){
  case types.ADMIN_GET_USER_DATA_SUCCESS:
    if (action.message.data.role == "Parent"){
      return {...state, role: action.message.data.role, parentData: action.message.data.profile, providerData: '' }
    } else if (action.message.data.role == "Provider"){
      return {...state, role: action.message.data.role, providerData: action.message.data.profile, parentData: '' }
    } else
      return state;
  case types.ADMIN_GET_USER_DATA:
  case types.ADMIN_GET_USER_DATA_FAILURE:
    return state;
  default:
    return state;
  }
}

const administratorReducer = combineReducers({
  profile,
  userData,
});


export default administratorReducer;
