import { combineReducers } from 'redux';
import * as types from '../types/userTypes';

const username = (
  state = '',
  action
) => {
  switch (action.type){
    case types.LOGIN_SUCCESS_ADMINISTRATOR_USERNAME:
      return action.message;
    case types.LOGOUT_SUCCESS_UNSET_USERNAME:
        return '';
    default:
      return state;
  }
}


const administratorReducer = combineReducers({
  username
});


export default administratorReducer;
