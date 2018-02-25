import { combineReducers } from 'redux';
import * as types from '../types/parentTypes';
import { combineForms} from 'react-redux-form';

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
    case types.FORGOT:
    case types.FORGOT_SUCCESS:
    case types.FORGOT_ERROR:
    case types.PARENT_CHANGE_CREDENTIALS_FAILURE:
      return action.message;
    default:
      return state;
  }
};


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
// name,
// surname,
// email,
// telephone,
// address,
// birthday

const username = (
  state = '',
  action
) => {
  switch (action.type){
    case types.PARENT_CHANGE_CREDENTIALS_SUCCESS:
      return {...state, username: action.message}
    case types.PARENT_CHANGE_CREDENTIALS:
    case types.PARENT_CHANGE_CREDENTIALS_FAILURE:
      return state;
    default:
      return state;
  }
}

const profile = (
  state = {name: '', surname: '', email: '', address: '', telephone: '', birthday: ''},
  action
) => {
  switch (action.type){
    case types.PARENT_CHANGE_PROFILE_SUCCESS:
      return action.message
  case types.PARENT_CHANGE_PROFILE:
  case types.PARENT_CHANGE_PROFILE_FAILURE:
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
