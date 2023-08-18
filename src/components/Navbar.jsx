import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from "../action-types/app-action-types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {

    const {app_state, dispatch} = useContext(AppContext);

    const {signedIn, user} = app_state;

    const handleSignOut = () => {
        signOut(auth);
        dispatch({type: APP_ACTION_TYPES.SIGN_OUT})
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                {!signedIn && <Button variant="primary" onClick={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODULE, payload: true})}>Sign In</Button>}
                {signedIn && <Button variant="primary" onClick={handleSignOut}>Sign Out</Button>}
                {console.log(user)}
            </div>
        </nav>
    );
};

export default Navbar;