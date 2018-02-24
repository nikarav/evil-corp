import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as types from '../types';
import { combineForms} from 'react-redux-form';
import user from '../reducers/user';
import ActivityList from '../reducers/ActivityShow';
import parent from '../reducers/parent';

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
    location: '',
    description: '',
    date: '',
    photo: '',
    total_tickets: '',
    available_tickets: '',
    min_age: '',
    max_age: '',
    tags: '',
    price: '',
    provider: '',
};

const initialProviderState = {
  brand_name: 'manolisAE',
  email: 'manolis.company@mail.com',
  telephone: '+302105435',
  address: 'grafeio',
  tax_registration: 'tax_reg',
  bank_iban: '5039',
  username: 'manolis_com',
  password: 'pass_com',
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

const initialParentProfileForm = {
  credits: 0,
  name: '',
  surname: '',
  email: '',
  telephone: '',
  address: '',
  birthday: '',
  username: '',
  password: ''
}

const rootReducer = combineReducers({
  isFetching,
  user,
  ActivityList,
  parent,
  parentProfileForm: combineForms({
    user: initialParentProfileForm,
  }, 'parentProfileForm'
  ),
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
  ),
});

export default rootReducer;
