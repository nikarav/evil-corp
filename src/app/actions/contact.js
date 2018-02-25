import contactService from '../services/contactService';
import Notifications, { success } from 'react-notification-system-redux';

export function userSendMessage(data) {
  const notificationSuccess = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Thanks for sending us a message!',
  message: 'Message sumbitted successfully',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'anonymous user!!',
    callback: () => alert('clicked!')
  }};
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Thanks for sending us a message!',
  message: 'Message submission failure',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'anonymous user!!',
    callback: () => alert('clicked!')
  }
};


  return (dispatch) => {
    return contactService().userSendMessage(data)
      .then((response) => {
        dispatch( success(notificationSuccess));
          //browserHistory.push('/');
      })
      .catch((err) => {
          dispatch( success(notificationFailure));
      });
  };
}


export function parentSendMessage(data) {
  const notificationSuccess = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Thanks for sending us a message!',
  message: 'Message sumbitted successfully',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'parent!!',
    callback: () => alert('clicked!')
  }
};
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Thanks for sending us a message!',
  message: 'Message submission failure',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'parent!!',
    callback: () => alert('clicked!')
  }
};


  return (dispatch) => {
    return contactService().parentSendMessage(data)
      .then((response) => {
        dispatch( success(notificationSuccess));
          //browserHistory.push('/');
      })
      .catch((err) => {
          dispatch( success(notificationFailure));
      });
  };
}


export function providerSendMessage(data) {
  console.log("providerSendMessage");
  console.log(data);
  const notificationSuccess = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Thanks for sending us a message!',
  message: 'Message sumbitted successfully',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'provider!!',
    callback: () => alert('clicked!')
  }};
  const notificationFailure = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Thanks you sending us a message!',
  message: 'Message submission failure',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'provider!!',
    callback: () => alert('clicked!')
  }
};


  return (dispatch) => {
    return contactService().providerSendMessage(data)
      .then((response) => {
        dispatch( success(notificationSuccess));
          //browserHistory.push('/');
      })
      .catch((err) => {
          dispatch( success(notificationFailure));
      });
  };
}
