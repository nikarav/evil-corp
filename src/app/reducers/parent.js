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
      return '';
    case types.GET_CREDITS_FAILURE:
    case types.ADD_CREDITS_FAILURE:
    case types.FORGOT:
    case types.FORGOT_SUCCESS:
    case types.FORGOT_ERROR:
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


const parentReducer = combineReducers({
  credits,
  message,
});


export default parentReducer;
