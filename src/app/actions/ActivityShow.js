import * as types from '../types/ActivityTypes';
import * as typesindex from '../types/index';
/* import ActivityService from '../ActivityService'; */
import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../createRestApiClient';

export function fetchPosts() {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  const request = client.request({
      method: 'GET',
      url: '/api/activities',
      headers: []
  });

  return {
    type: FETCH_ACTIVITIES,
    payload: request
  };
}

export function fetchActivitiesSuccess(activities) {
    return {
        type: types.FETCH_ACTIVITIES_SUCCESS,
        payload: activities
    };
}

export function fetchActivitiesFailure(error) {
    return {
        type: types.FETCH_ACTIVITIES_FAILURE,
        payload: error
    };
}


export function validatePostFieldsSuccess() {
    return {
        type: types.VALIDATE_ACTIVITIES_FIELDS_SUCCESS
    };
}

export function validatePostFieldsFailure(error) {
    return {
        type: types.VALIDATE_ACTIVITIES_FIELDS_FAILURE,
        payload: error
    };
}

export function resetPostFields() {
    return {
        type: types.RESET_ACTIVITIES_FIELDS
    };
}


export function resetActivePost() {
    return {
        type: types.RESET_ACTIVE_ACTIVITY
    };
}
