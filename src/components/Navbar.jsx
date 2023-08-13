import React, { useState, useContext } from "react";
import SignIn from "./SignIn";
import Button from "react-bootstrap/Button";
import AppContext from "../AppContext";

const Navbar = () => {

    const {setShowSignIn} = useContext(AppContext);

    // const handleSignInClick

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Button variant="primary" onClick={() => setShowSignIn(true)}>Sign In</Button>
            </div>
        </nav>
    );
};

export default Navbar;