import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as types from '../types';
import { modelReducer, formReducer, combineForms} from 'react-redux-form';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

const initialProviderState = {
  firstName: '',
  lastName: '',
  age: '',
  gender: ''
};

const initialUserSate = {
  firstName: '',
  lastName: ''
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching: isFetching,
  userForm: combineForms({
      user: initialUserSate,
    }, 'userForm'
  ),
  providerForm: combineForms({
    user: initialProviderState,
    }, 'providerForm'),
});

export default rootReducer;
