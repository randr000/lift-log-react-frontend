import React, { useState, useReducer, useContext } from "react";
import SignIn from "./SignIn";
import Button from "react-bootstrap/Button";
import AppContext from '../contexts/AppContext';
import { appReducer, APP_INITIAL_STATE } from "../reducers/appReducer";
import APP_ACTION_TYPES from "../action-types/app-action-types";
import App from "../App";

const Navbar = () => {

    const {app_state, dispatch} = useContext(AppContext);

    // const handleSignInClick

    // const [state, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Button variant="primary" onClick={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODULE, payload: true})}>Sign In</Button>
            </div>
        </nav>
    );
};

export default Navbar;