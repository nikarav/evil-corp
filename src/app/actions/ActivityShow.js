import * as types from '../types/ActivityTypes';
import * as typesindex from '../types/index';
import ActivityService from '../services/ActivityService';

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


function resetActivePost() {
    return {
        type: types.RESET_ACTIVE_ACTIVITY
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
