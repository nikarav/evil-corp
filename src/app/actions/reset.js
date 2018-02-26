import resetService from '../services/resetService';
import Notifications, { success, error } from 'react-notification-system-redux';



export function resetParent(data){
  const notificationSuccess = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'reset parent password',
  message: 'Parent\'s password successfully reseted',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'reset parent password',
  message: 'Parent\'s password reset failed',
  position: 'tr',
  autoDismiss: 0,
};

  return (dispatch) => {
    return resetService().resetParent(data)
      .then((response) => {
          dispatch( success(notificationSuccess));
      })
      .catch((err) => {
        dispatch( error(notificationFailure));
      })
  }
}


export function resetProvider(data){
  const notificationSuccess = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'reset provider password',
  message: 'Provider\'s password successfully reseted',
  position: 'tr',
  autoDismiss: 0,
  };
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'reset provider password',
  message: 'Provider\'s password reset failed',
  position: 'tr',
  autoDismiss: 0,
};

  return (dispatch) => {
    return resetService().resetProvider(data)
      .then((response) => {
          dispatch( success(notificationSuccess));
      })
      .catch((err) => {
        dispatch( error(notificationFailure));
      })
  }
}
