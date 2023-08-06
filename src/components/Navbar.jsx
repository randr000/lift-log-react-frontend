import React, { useState } from "react";
import SignIn from "./SignIn";
import Button from "react-bootstrap/Button";

const Navbar = ({setShowSignIn}) => {

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Button variant="primary" onClick={() => setShowSignIn(true)}>Sign In</Button>
            </div>
        </nav>
    );
};

export default Navbar;