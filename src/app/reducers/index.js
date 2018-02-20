import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as types from '../types';
import { modelReducer, formReducer, combineForms} from 'react-redux-form';
import user from '../reducers/user';

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

const initialActivityState = {
    name: '',
    location:'',
    description: '',
};

const initialProviderState = {
  brand_name: '',
  email: '',
  telephone: '',
  address: '',
  tax_registration: '',
  bank_iban: '',
  username: '',
  password: '',
};

const initialUserSate = {
  name: 'manolis',
  surname: 'anastasiou',
  email: 'manolisan28@gmail.com',
  telephone: '6979978425',
  address: 'Kallistratous 18',
  birthday: '22',
  username: 'manolis',
  password: 'pass'
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  user,
  userForm: combineForms({
    user: initialUserSate,
    }, 'userForm'
  ),
  providerForm: combineForms({
    user: initialProviderState,
    }, 'providerForm'
  ),
  logInForm: combineForms({
    user: {username: '', password: ''},
    }, 'logInForm'
  )
});

export default rootReducer;
