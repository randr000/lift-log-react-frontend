import APP_ACTION_TYPES from "../action-types/app-action-types";

export const APP_INITIAL_STATE = {
    showSignIn: false,
    signInError: false,
    signedIn: false,
    user: false
}

export const appReducer = (state, action) => {

    const {type, payload} = action;

    switch(type) {
        case APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODULE:
            return {...state, showSignIn: payload, signInError: false};
        case APP_ACTION_TYPES.SIGN_IN_SUCCESSFUL:
            return {...state, showSignIn: false, signInError: false, signedIn: true, user: payload};
        case APP_ACTION_TYPES.SIGN_IN_UNSUCCESSFUL:
            return {...state, signInError: true, signedIn: false};
        case APP_ACTION_TYPES.SIGN_OUT:
            return {...state, signedIn: false, user: false}
        default: return state;
    }
};