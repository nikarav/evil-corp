import * as types from '../types/parentTypes';
import parentService from '../services/parentService';

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

function addCreditsSuccess() {
    return {
        type: types.ADD_CREDITS_SUCCESS,
    };
}

function addCreditsFailure(error) {
    return {
        type: types.ADD_CREDITS_FAILURE,
        message: error
    };
}


// user triggered functions
export function getCredits() {
    return (dispatch) => {
        dispatch(beginGetCredits());

        return parentService().getCredits()
            .then((response) => {
                dispatch(getCreditsSuccess(response.data));
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
                dispatch(addCreditsSuccess());
            })
            .catch((err) => {
                dispatch(addCreditsFailure(err));
            });
    };
}
