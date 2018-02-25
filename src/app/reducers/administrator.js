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
    case types.ADMIN_CHANGE_EMAIL_SUCCESS:
      return {...state, email: action.message.email};
    case types.LOGIN_SUCCESS_ADMINISTRATOR_USERNAME:
      return  action.message.username;
    case types.LOGOUT_SUCCESS_UNSET_USERNAME:
      return {...state, username: ''};
    case types.ADMIN_GET_DATA_SUCCESS:
        return {...state, username: action.message.username, email: action.message.profile.email}
    case types.ADMIN_GET_DATA_FAILURE:
    case types.ADMIN_GET_DATA:
    case types.ADMIN_CHANGE_EMAIL_FAILURE:
    case types.ADMIN_CHANGE_EMAIL:
    return state;
  default:
    return state;
}
}


const administratorReducer = combineReducers({
  profile
});


export default administratorReducer;
