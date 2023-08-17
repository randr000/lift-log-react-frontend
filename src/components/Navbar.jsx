import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from "../action-types/app-action-types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {

    const {app_state, dispatch} = useContext(AppContext);

    const {user} = app_state;

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                {!user && <Button variant="primary" onClick={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODULE, payload: true})}>Sign In</Button>}
                {user && <Button variant="primary" onClick={() => signOut(auth)}>Sign Out</Button>}
                {console.log(user)}
            </div>
        </nav>
    );
};

export default Navbar;