import * as types from '../types/administratorTypes';
import administratorService from '../services/administratorService';
import Notifications, { success, error } from 'react-notification-system-redux';

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
          console.log(response.data.username);
          console.log(response.data.profile.email);
          dispatch(getAdminDataSuccess(response.data));
          //browserHistory.push('/');
      })
      .catch((err) => {
        dispatch(getAdminDataFailure('Oops! Something went wrong when trying to get profile data of logged in parent.'));
      });
  };
}


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
    return administratorService().approveProvider(data)
      .then((response) => {
        if (response.data.activated){
          dispatch( success(notificationSuccessActivated));
        } else{
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
    return administratorService().rejectProvider(data)
      .then((response) => {

          dispatch( success(notificationSuccess));
      })
      .catch((err) => {
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
  console.log(data);
  return (dispatch) => {
    return administratorService().changeEmail(data)
      .then((response) => {
          dispatch( success(notificationSuccess));
      })
      .catch((err) => {
        dispatch( error(notificationFailure));
      })
  }
}
