import React, { useContext } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Button from "react-bootstrap/Button";
import { Router, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from "../action-types/app-action-types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SiteNavbar = () => {

    const {app_state, dispatch} = useContext(AppContext);

    const navigate = useNavigate();

    const {signedIn, user} = app_state;

    const handleSignOut = () => {
        signOut(auth);
        dispatch({type: APP_ACTION_TYPES.SIGN_OUT})
    }

    return (
        <Navbar expand="lg" className="bg-light">
            <SignIn />
            <SignUp />
            <Container fluid>
                <Navbar.Brand
                    className="google-font-800 text-center fs-3 blue-logo-color"
                    style={{color: "#066AE1", cursor: "pointer"}}
                    onClick={() => navigate("/")}
                    data-testid="logo-text"
                >
                    liftlog
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            !signedIn && 
                            <Nav.Item className="m-2">
                                <Button variant="primary" onClick={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODAL, payload: true})}>
                                    Sign In
                                </Button>
                            </Nav.Item>
                        }
                        {
                            !signedIn &&
                            <Nav.Item className="m-2">
                                <Button variant="success" onClick={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_UP_MODAL, payload: true})}>Sign Up</Button>
                            </Nav.Item>
                        }
                        {signedIn && <Nav.Item className="m-2"><Button variant="primary" onClick={handleSignOut}>Sign Out</Button></Nav.Item>}
                        <Nav.Item className="m-2">
                            <Button variant="primary" onClick={() => navigate("/about")}>About</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

};

export default SiteNavbar;