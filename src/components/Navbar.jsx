import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from "../action-types/app-action-types";

const Navbar = () => {

    const {dispatch} = useContext(AppContext);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Button variant="primary" onClick={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODULE, payload: true})}>Sign In</Button>
            </div>
        </nav>
    );
};

export default Navbar;