import * as types from '../types/ActivityTypes';

const INITIAL_STATE = { newPost: {post: null, error: null, loading: false},
};

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
      case types.CREATE_ACTIVITY:
          return {...state, newPost: {...state.newPost, loading: true}};
      case types.CREATE_ACTIVITY_SUCCESS:
          return {...state, newPost: {post: action.payload, error: null, loading: false}};
      case types.CREATE_ACTIVITY_FAILURE:
          error = action.payload || {message: action.payload.message};// 2nd one is network or server down errors
          return {...state, newPost: {post: null, error, loading: false}};
      case types.RESET_NEW_ACTIVITY:
          return {...state, newPost: {post: null, error: null, loading: false}};
      default:
              return state;
    }
  }
