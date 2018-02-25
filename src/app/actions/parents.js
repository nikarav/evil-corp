import * as types from '../types/parentTypes';
import parentService from '../services/parentService';

//getParentData
function beginGetParentData() {
    return {
        type: types.PARENT_GET_DATA
    };
}
function getParentDataSuccess(credits) {
    return {
        type: types.PARENT_GET_DATA_SUCCESS,
        message: credits
    };
}
function getParentDataFailure(error) {
    return {
        type: types.PARENT_GET_DATA_FAILURE,
        message: error
    };
}


// get credits
function beginGetCredits() {
    return {
        type: types.GET_CREDITS
    };
}
function getCreditsSuccess(credits) {
    return {
        type: types.GET_CREDITS_SUCCESS,
        message: credits
    };
}
function getCreditsFailure(error) {
    return {
        type: types.GET_CREDITS_FAILURE,
        message: error
    };
}

// add credits
function beginAddCredits() {
    return {
        type: types.ADD_CREDITS
    };
}
function addCreditsSuccess(credits) {
    return {
        type: types.ADD_CREDITS_SUCCESS,
        message: credits
    };
}
function addCreditsFailure(error) {
    return {
        type: types.ADD_CREDITS_FAILURE,
        message: error
    };
}

// Change Credentials
// CHANGE_CREDENTIALS actions  --> **User** (Parents)
function beginChangeCredentialsUser() {
  return { type: types.PARENT_CHANGE_CREDENTIALS };
}
function changeCredentialsUserSuccess(message) {
  return {
    type: types.PARENT_CHANGE_CREDENTIALS_SUCCESS,
    message: message
  };
}
function changeCredentialsUserError(message) {
  return {
    type: types.PARENT_CHANGE_CREDENTIALS_FAILURE,
    message: message
  };
}

// Change profile
// CHANGE_PROFILE actions  --> **User** (Parents)
function beginChangeProfileUser() {
  return { type: types.PARENT_CHANGE_PROFILE };
}
function changeProfileUserSuccess(message) {
  return {
    type: types.PARENT_CHANGE_PROFILE_SUCCESS,
    message: message
  };
}
function changeProfileUserError(message) {
  return {
    type: types.PARENT_CHANGE_PROFILE_FAILURE,
    message: message
  };
}


// user triggered functions CREDITS
export function getCredits() {
    return (dispatch) => {
        dispatch(beginGetCredits());

        return parentService().getCredits()
            .then((response) => {
              console.log(response.data.credits);
              dispatch(getCreditsSuccess(response.data.credits));
            })
            .catch((err) => {
                dispatch(getCreditsFailure(err));
            });
    };
}

export function addCredits(credits) {
    return (dispatch) => {
        dispatch(beginAddCredits());

        return parentService().addCredits(credits)
            .then((response) => {
                dispatch(addCreditsSuccess(response.data.credits));
            })
            .catch((err) => {
                dispatch(addCreditsFailure(err));
            });
    };
}

// user triggered function CHANGE PROFILE - CREDENTIALS
// user triggered function -> changeCredentials
export function changeCredentialsUser(data) {
  return (dispatch) => {
    dispatch(beginChangeCredentialsUser());

    return parentService().changeCredentials(data)
      .then((response) => {
          dispatch(changeCredentialsUserSuccess(response.data.username));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(changeCredentialsUserError('Oops! Something went wrong when changing your credentials attributes.'));
      });
  };
}

// user triggered function CHANGE PROFILE - CREDENTIALS
// user triggered function -> changeCredentials
export function changeProfileUser(data) {
  return (dispatch) => {
    dispatch(beginChangeProfileUser());

    return parentService().changeProfile(data)
      .then((response) => {
          dispatch(changeProfileUserSuccess(response.data));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(changeProfileUserError('Oops! Something went wrong when changing your profile attributes.'));
      });
  };
}

// user triggered function GET PARENT PROFILE data
// user triggered function -> getData
export function getParentData() {
  return (dispatch) => {
    dispatch(beginGetParentData());

    return parentService().getData()
      .then((response) => {
          console.log({...response.data});
          dispatch(getParentDataSuccess({...response.data}));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(getParentDataFailure('Oops! Something went wrong when trying to get profile data of logged in parent.'));
      });
  };
}
