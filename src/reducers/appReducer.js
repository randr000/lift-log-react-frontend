import APP_ACTION_TYPES from "../action-types/app-action-types";

export const APP_INITIAL_STATE = {
    showSignIn: false,
    signInError: false,
    showSignUp: false,
    signUpError: false,
    signedIn: JSON.parse(localStorage.getItem('user')) ? true : false,
    user: JSON.parse(localStorage.getItem('user')) || false,
    displayName: '',
    showAddExerciseForm: false
};

export const appReducer = (state, action) => {

    const {type, payload} = action;

    switch(type) {
        case APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODAL:
            return {...state, showSignIn: payload, signInError: false};
        case APP_ACTION_TYPES.SIGN_IN_SUCCESSFUL:
            return {...state, showSignIn: false, signInError: false, signedIn: true, user: payload};
        case APP_ACTION_TYPES.SIGN_IN_UNSUCCESSFUL:
            return {...state, signInError: true, signedIn: false};
        case APP_ACTION_TYPES.SIGN_OUT:
            return {...state, signedIn: false, user: false};
        case APP_ACTION_TYPES.TOGGLE_SIGN_UP_MODAL:
            return {...state, showSignUp: payload, signUpError: false};
        case APP_ACTION_TYPES.SIGN_UP_SUCCESSFUL:
            return {...state, showSignUp: false, signUpError: false, signedIn: true, user: payload};
        case APP_ACTION_TYPES.SIGN_UP_UNSUCCESSFUL:
            return {...state, signUpError: true, signedIn: false};
        case APP_ACTION_TYPES.UPDATE_DISPLAY_NAME:
            return {...state, displayName: payload};
        case APP_ACTION_TYPES.TOGGLE_ADD_EXERCISE_MODAL:
            return {...state, showAddExerciseForm: payload};
        default: return state;
    }
};