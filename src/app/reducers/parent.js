import { combineReducers } from 'redux';
import * as types from '../types/index';

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
      return action.message;
    case types.ADD_CREDITS_SUCCESS:
      return state;
      //return action.message;
    default:
      return state;

  }
}




const parentReducer = combineReducers({
  credits,
  message,
});


export default parentReducer;
