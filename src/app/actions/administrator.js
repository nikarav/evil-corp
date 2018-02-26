import * as types from '../types/administratorTypes';
import administratorService from '../services/administratorService';
import Notifications, { success, error } from 'react-notification-system-redux';

// change Email
function beginApproveRejectAdmin() {
    return {
        type: types.APROVE_REJECT_PROVIDER
    };
}
function approveRejectAdminSuccess(message) {
    return {
        type: types.APROVE_REJECT_PROVIDER_SUCCESS,
        message
    };
}
function approveRejectAdminFailure(error) {
    return {
        type: types.APROVE_REJECT_PROVIDER_FAILURE,
        message: error
    };
}



// change Email
function beginChangeEmailAdmin() {
    return {
        type: types.ADMIN_CHANGE_EMAIL
    };
}
function changeEmailAdminSuccess(message) {
    return {
        type: types.ADMIN_CHANGE_EMAIL_SUCCESS,
        message
    };
}
function changeEmailAdminFailure(error) {
    return {
        type: types.ADMIN_CHANGE_EMAIL_FAILURE,
        message: error
    };
}


//getParentData
function beginGetAdmintData() {
    return {
        type: types.ADMIN_GET_DATA
    };
}
function getAdminDataSuccess(message) {
    return {
        type: types.ADMIN_GET_DATA_SUCCESS,
        message
    };
}
function getAdminDataFailure(error) {
    return {
        type: types.ADMIN_GET_DATA_FAILURE,
        message: error
    };
}
export function getData() {
  return (dispatch) => {
    dispatch(beginGetAdmintData());

    return administratorService().getData()
      .then((response) => {
          dispatch(getAdminDataSuccess(response.data));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(getAdminDataFailure('Oops! Something went wrong when trying to get profile data of logged in parent.'));
      });
  };
}

//providersForApproval
function beginprovidersForApproval() {
    return {
        type: types.ADMIN_PROVIDERS_FOR_APPROVAL
    };
}
function providersForApprovalSuccess(message) {
    return {
        type: types.ADMIN_PROVIDERS_FOR_APPROVAL_SUCCESS,
        message
    };
}
function providersForApprovalFailure(error) {
    return {
        type: types.ADMIN_PROVIDERS_FOR_APPROVAL_FAILURE,
        message: error
    };
}
export function providersForApproval() {
  return (dispatch) => {
    dispatch(beginprovidersForApproval());

    return administratorService().providersForApproval()
      .then((response) => {
          dispatch(providersForApprovalSuccess(response.data));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(providersForApprovalFailure('Oops! Something went wrong when trying to get profile data of logged in parent.'));
      });
  };
}


/***************  ACTIONS WITH NOTIFICATIONS ********************/


// user triggered function -> isLocked
export function isLocked(data){
  const notificationSuccessLocked = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'isUserLocked?',
  message: 'User locked',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationSuccessUnLocked = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'isUserLocked?',
  message: 'User Unlocked',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'isUserLocked?',
  message: 'Failure',
  position: 'tr',
  autoDismiss: 0,
};

  return (dispatch) => {
    return administratorService().isLocked(data)
      .then((response) => {
        if (response.data.locked){
          dispatch( success(notificationSuccessLocked));
        } else{
          dispatch( success(notificationSuccessUnLocked));
        }
      })
      .catch((err) => {
        dispatch( error(notificationFailure));
      })
  }
}

export function toogleLock(data){
  const notificationSuccessLocked = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'User is now:',
  message: 'Locked',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationSuccessUnLocked = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'User is now:',
  message: 'Unlocked',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'isUserLocked?',
  message: 'Failure',
  position: 'tr',
  autoDismiss: 0,
};

  return (dispatch) => {
    return administratorService().toggleLock(data)
      .then((response) => {
        if (response.data.locked){
          dispatch( success(notificationSuccessLocked));
        } else{
          dispatch( success(notificationSuccessUnLocked));
        }
      })
      .catch((err) => {
        dispatch( error(notificationFailure));
      })
  }
}

export function approveProvider(data){
  const notificationSuccessActivated = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'approveProvider',
  message: 'The provider is activated',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationSuccessNotActive = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'approveProvider',
  message: 'The provider is not activated',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'isUserLocked?',
  message: 'Failure',
  position: 'tr',
  autoDismiss: 0,
};

  return (dispatch) => {
    dispatch(beginApproveRejectAdmin());
    return administratorService().approveProvider(data)
      .then((response) => {
        if (response.data.activated){
          console.log(data.username);
          dispatch(approveRejectAdminSuccess(data.username));
          dispatch( success(notificationSuccessActivated));
        } else{
          dispatch(approveRejectAdminFailure(false));
          dispatch( success(notificationSuccessNotActive));
        }
      })
      .catch((err) => {
        dispatch( error(notificationFailure));
      })
  }
}


export function rejectProvider(data){
  const notificationSuccess = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'rejectProvider',
  message: 'The provider is rejected',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'isUserLocked?',
  message: 'Failure',
  position: 'tr',
  autoDismiss: 0,
};

  return (dispatch) => {
    dispatch(beginApproveRejectAdmin());
    return administratorService().rejectProvider(data)
      .then((response) => {
        dispatch(approveRejectAdminSuccess(data.username));
          dispatch( success(notificationSuccess));
      })
      .catch((err) => {
        dispatch(approveRejectAdminFailure(false));
        dispatch( error(notificationFailure));
      })
  }
}

export function forgot(data){
  const notificationSuccess = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Forgot email',
  message: 'Mail sent',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Forgot email',
  message: 'Failded to send email',
  position: 'tr',
  autoDismiss: 0,
};

  return (dispatch) => {
    return administratorService().forgot(data)
      .then((response) => {

          dispatch( success(notificationSuccess));
      })
      .catch((err) => {
        dispatch( error(notificationFailure));
      })
  }
}

export function changeEmail(data){
  const notificationSuccess = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Change Email',
  message: 'Email successfully changed',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Change email',
  message: 'Failded to change email',
  position: 'tr',
  autoDismiss: 0,
};
  return (dispatch) => {
    dispatch(beginChangeEmailAdmin());

    return administratorService().changeEmail(data)
      .then((response) => {
          dispatch( changeEmailAdminSuccess(response.data));
          dispatch( success(notificationSuccess));
      })
      .catch((err) => {
        dispatch(cangeEmailAdminFailure(err));
        dispatch( error(notificationFailure));
      })
  }
}

//getParentData
function beginGetUserData() {
    return {
        type: types.ADMIN_GET_USER_DATA
    };
}
function getUserDataSuccess(message) {
    return {
        type: types.ADMIN_GET_USER_DATA_SUCCESS,
        message
    };
}
function getUserDataFailure(error) {
    return {
        type: types.ADMIN_GET_USER_DATA_FAILURE,
        message: error
    };
}

export function userData(data){
  console.log(data);

  return (dispatch) => {
    dispatch(beginGetUserData());

    return administratorService().userData(data)
      .then((response) => {
          // console.log(response.data);

          // get Document of provider
          if (response.data.data.role == "Provider") {
            console.log("providerDocument START");
            return administratorService().providerDocument(data)
            .then((response) => {
              console.log("providerDocument success");
            })
            .catch((err) =>{
              console.log("providerDocument fail");
            })
          }

          dispatch( getUserDataSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUserDataFailure(err));
      })
  }
}
