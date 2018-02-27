import * as types from '../types/ActivityTypes';
import * as typesindex from '../types/index';
import ActivityService from '../services/ActivityService';
import Notifications, { success, error } from 'react-notification-system-redux';

function beginGetActivities() {
    return {
        type: types.FETCH_ACTIVITIES
    };
}
function fetchActivitiesSuccess(activities) {
    return {
        type: types.FETCH_ACTIVITIES_SUCCESS,
        payload: activities
    };
}

function fetchActivitiesFailure(error) {
    return {
        type: types.FETCH_ACTIVITIES_FAILURE,
        payload: error
    };
}
function beginGetActivity() {
    return {
        type: types.FETCH_ACT
    };
}
function fetchActivitySuccess(activity) {
    return {
        type: types.FETCH_ACT_SUCCESS,
        payload: activity
    };
}

function fetchActivityFailure(error) {
    return {
        type: types.FETCH_ACT_FAILURE,
        payload: error
    };
}
function beginCreateActivity() {
    return {
        type: types.CREATE_ACTIVITY
    };
}

function createActivitySuccess(activity) {
    return {
        type: types.CREATE_ACTIVITY_SUCCESS,
        payload: activity
    };
}

function createActivityFailure(error) {
    return {
        type: types.CREATE_ACTIVITY_FAILURE,
        payload: error
    };
}

function validatePostFieldsSuccess() {
    return {
        type: types.VALIDATE_ACTIVITIES_FIELDS_SUCCESS
    };
}

function validatePostFieldsFailure(error) {
    return {
        type: types.VALIDATE_ACTIVITIES_FIELDS_FAILURE,
        payload: error
    };
}

function resetPostFields() {
    return {
        type: types.RESET_ACTIVITIES_FIELDS
    };
}


export function resetActiveActivity() {
    return {
        type: types.RESET_ACTIVE_ACTIVITY
    };
}

function fetchPostSuccess(activePost) {
  return {
    type: types.FETCH_ACTIVITY_SUCCESS,
    payload: activePost
  };
}

function fetchPostFailure(error) {
  return {
    type: types.FETCH_ACTIVITY_FAILURE,
    payload: error
  };
}


export function getActivities() {
    return (dispatch) => {
        dispatch(beginGetActivities());

        return ActivityService().getPosts()
            .then((response) => {
                dispatch(fetchActivitiesSuccess(response.data));
            })
            .catch((err) => {
                dispatch(fetchActivitiesFailure(err));
            });
    };
}
export function getActivity(id) {
    return (dispatch) => {
        dispatch(beginGetActivity());

        return ActivityService().getActivity(id)
            .then((response) => {
                dispatch(fetchActivitySuccess(response.data));
            })
            .catch((err) => {
                dispatch(fetchActivityFailure(err));
            });
    };
}

export function createActivity(data) {
    return (dispatch) => {
        dispatch(beginCreateActivity());

        return ActivityService().createPost(data)
            .then((response) => {
                dispatch(createActivitySuccess(response.data));
            })
            .catch((err) => {
                dispatch(createActivityFailure(err));
            });
    };
}

export function updateCurrentActivity(data){
    return (dispatch) => {
      dispatch(fetchPostSuccess(data));
      return dispatch(fetchPostSuccess(data));
    };
}

export function beginSearch() {
    return {
        type: types.BEGIN_SEARCH
    };
}

function searchSuccess(activePost) {
  return {
    type: types.SEARCH_SUCCESS,
    payload: activePost
  };
}

function searchFailure(error) {
  return {
    type: types.SEARCH_FAILURE,
    payload: error
  };
}

export function search(data){
  return (dispatch) => {
    dispatch(beginSearch());

    return ActivityService().search(data)
      .then((response) => {
        // console.log('search');
        // console.log(response.data);
        //   if (response.data){
        //   // response.data.map(post =>
        //   //   // dispatch(searchSuccess(post.activityId))
        //       console.log(post.activityId)
        //   // );
        //   }
        //   // dispatch(searchSuccess(response.data));
        //   //browserHistory.push('/');
        dispatch(searchSuccess(response.data));


      })
      .catch((err) => {
        dispatch(searchFailure('Oops! Something went wrong when trying to get profile data of logged in parent.'));
      });
  };
}
