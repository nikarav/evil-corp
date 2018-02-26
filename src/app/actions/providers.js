import * as types from '../types/providerTypes';
import providerService from '../services/providerService';
import Notifications, { success, error } from 'react-notification-system-redux';

//getProviderData
function beginGetProviderData() {
    return {
        type: types.PROVIDER_GET_DATA
    };
}
function getProviderDataSuccess(credits) {
    return {
        type: types.PROVIDER_GET_DATA_SUCCESS,
        message: credits
    };
}
function getProviderDataFailure(error) {
    return {
        type: types.PROVIDER_GET_DATA_FAILURE,
        message: error
    };
}


// Change Credentials
// CHANGE_CREDENTIALS actions  --> **Provider**
function beginChangeCredentialsProvider() {
  return { type: types.PROVIDER_CHANGE_CREDENTIALS };
}
function changeCredentialsProviderSuccess(message) {
  return {
    type: types.PROVIDER_CHANGE_CREDENTIALS_SUCCESS,
    message: message
  };
}
function changeCredentialsProviderError(message) {
  return {
    type: types.PROVIDER_CHANGE_CREDENTIALS_FAILURE,
    message: message
  };
}

// Change profile
// CHANGE_PROFILE actions  --> **Provider**
function beginChangeProfileProvider() {
  return { type: types.PROVIDER_CHANGE_PROFILE };
}
function changeProfileProviderSuccess(message) {
  return {
    type: types.PROVIDER_CHANGE_PROFILE_SUCCESS,
    message: message
  };
}
function changeProfileProviderError(message) {
  return {
    type: types.PROVIDER_CHANGE_PROFILE_FAILURE,
    message: message
  };
}


// user triggered function CHANGE PROFILE - CREDENTIALS
// user triggered function -> changeCredentials
export function changeCredentialsProvider(data) {
  return (dispatch) => {
    dispatch(beginChangeCredentialsProvider());

    return providerService().changeCredentials(data)
      .then((response) => {
          dispatch(changeCredentialsProviderSuccess(response.data.username));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(changeCredentialsProviderError('Oops! Something went wrong when changing your credentials attributes.'));
      });
  };
}

// user triggered function CHANGE PROFILE - CREDENTIALS
// user triggered function -> changeCredentials
export function changeProfileProvider(data) {
  return (dispatch) => {
    dispatch(beginChangeProfileProvider());

    return providerService().changeProfile(data)
      .then((response) => {
          dispatch(changeProfileProviderSuccess(response.data));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(changeProfileProviderError('Oops! Something went wrong when changing your profile attributes.'));
      });
  };
}

// user triggered function GET POVIDER PROFILE data
// user triggered function -> getData
export function getProviderData() {
  return (dispatch) => {
    dispatch(beginGetProviderData());

    return providerService().getData()
      .then((response) => {
          console.log({...response.data});
          dispatch(getProviderDataSuccess({...response.data}));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(getProviderDataFailure('Oops! Something went wrong when trying to get profile data of logged in provider.'));
      });
  };
}
