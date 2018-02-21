import * as types from '../types/ActivityTypes';


const INITIAL_STATE = { postsList: {posts: [], error: null, loading: false},
};

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        case types.FETCH_ACTIVITIES:// start fetching posts and set loading = true
            return { ...state, postsList: {posts: [], error: null, loading: true} };
        case types.FETCH_ACTIVITIES_SUCCESS:// return list of posts and make loading = false
            return { ...state, postsList: {posts: action.payload, error: null, loading: false} };
        case types.FETCH_ACTIVITIES_FAILURE:// return error and make loading = false
            error = action.payload || {message: action.payload.message};// 2nd one is network or server down errors
            return { ...state, postsList: {posts: [], error, loading: false} };
        case types.RESET_ACTIVITIES:// reset postList to initial state
            return { ...state, postsList: {posts: [], error: null, loading: false} };

        case types.FETCH_ACTIVITY:
            return { ...state, activePost: {...state.activePost, loading: true}};
        case types.FETCH_ACTIVITY_SUCCESS:
            return { ...state, activePost: {post: action.payload, error: null, loading: false}};
        case types.FETCH_ACTIVITY_FAILURE:
            error = action.payload || {message: action.payload.message};// 2nd one is network or server down errors
            return { ...state, activePost: {post: null, error, loading: false}};
        case types.RESET_ACTIVE_ACTIVITY:
            return { ...state, activePost: {post: null, error: null, loading: false}};
        case types.VALIDATE_ACTIVITIES_FIELDS:
            return {...state, newPost: {...state.newPost, error: null, loading: true}};
        case types.VALIDATE_ACTIVITIES_FIELDS_SUCCESS:
            return {...state, newPost: {...state.newPost, error: null, loading: false}};
        case types.VALIDATE_ACTIVITIES_FIELDS_FAILURE:
            const result = action.payload;
            if (!result) {
                error = {message: action.payload.message};
            } else {
                error = {title: result.title, categories: result.categories, description: result.description};
            }
            return {...state, newPost: {...state.newPost, error, loading: false}};
        case types.RESET_ACTIVITIES_FIELDS:
            return {...state, newPost: {...state.newPost, error: null, loading: null}};
        default:
            return state;
    }
}
