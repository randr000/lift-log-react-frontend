import React, { useContext, useState } from "react";
import Modals from "./modals/Modals";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from "../action-types/app-action-types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SiteNavbar = () => {

    const {appState, dispatch} = useContext(AppContext);

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const navigate = useNavigate();

    const {signedIn, user} = appState;

    function handleSignOut() {
        signOut(auth);
        dispatch({type: APP_ACTION_TYPES.SIGN_OUT});
    }

    function handleShowOffCanvas() {
        setShowOffcanvas(true);
    }

    function handleHideOffcanvas() {
        setShowOffcanvas(false);
    }

    function handleViewProfile() {
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_ACCOUNT_SETTINGS_MODAL,
            payload: true
        });
    }

    return (
        <Navbar expand="lg" className="bg-light" style={{height: "9vh"}}>
            <Modals />
            <Container fluid>
                <Navbar.Brand
                    className="google-font-800 text-center fs-3 blue-logo-color"
                    style={{color: "#066AE1", cursor: "pointer"}}
                    onClick={() => navigate("/")}
                    data-testid="logo-text"
                >
                    liftlog
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShowOffCanvas}/>
                <Navbar.Offcanvas show={showOffcanvas} onHide={handleHideOffcanvas} placement="top">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title />
                    </Offcanvas.Header>
                    <Offcanvas.Body className="justify-content-lg-end">
                        <Nav >
                            {
                                !signedIn &&
                                <Nav.Item className="m-lg-2 my-1">
                                    <Button variant="primary" className="btn-block" onClick={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODAL, payload: true})}>
                                        Sign In
                                    </Button>
                                </Nav.Item>
                            }
                            {
                                !signedIn &&
                                <Nav.Item className="m-lg-2 my-1">
                                    <Button variant="success" onClick={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_UP_MODAL, payload: true})}>Sign Up</Button>
                                </Nav.Item>
                            }
                            {
                                signedIn &&
                                <div className="d-flex flex-row">
                                    <Nav.Item className="m-lg-2 my-1"><Button variant="primary" onClick={handleSignOut}>Sign Out</Button></Nav.Item>
                                    <Nav.Item className="m-lg-2 my-1"><Button variant="primary" onClick={handleViewProfile}>Account Settings</Button></Nav.Item>
                                </div>
                            }
                            <Nav.Item className="m-lg-2 my-1">
                                <Button variant="primary" onClick={() => {navigate("/about"); handleHideOffcanvas();}}>About</Button>
                            </Nav.Item>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );

};

export default SiteNavbar;