import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from "../action-types/app-action-types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SiteNavbar = () => {

    const {app_state, dispatch} = useContext(AppContext);

    const {signedIn, user} = app_state;

    const handleSignOut = () => {
        signOut(auth);
        dispatch({type: APP_ACTION_TYPES.SIGN_OUT})
    }

    return (
        <Navbar expand="lg" className="bg-light">
            <Container fluid>
                <Navbar.Brand className="google-font-800 text-center fs-3 blue-logo-color" style={{color: "#066AE1"}}>liftlog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            !signedIn && 
                            <Nav.Item className="m-2">
                                <Button variant="primary" onClick={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODULE, payload: true})}>Sign In</Button>
                            </Nav.Item>
                        }
                        {!signedIn && <Nav.Item className="m-2"><Button variant="success" onClick={() => {}}>Sign Up</Button></Nav.Item>}
                        {signedIn && <Nav.Item className="m-2"><Button variant="primary" onClick={handleSignOut}>Sign Out</Button></Nav.Item>}
                        <Nav.Item className="m-2"><Button variant="primary">About</Button></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );


    // return (
    //     <nav className="navbar navbar-light bg-light">
    //         <Button className=>
    //             <span className="navbar-toggler-icon"></span>
    //         </Button>
    //         {/* <div className="container-fluid"> */}
    //             <Stack direction="horizontal" gap={3}>
                    // <Stack direction="horizontal" gap={3} className='ms-3'>
                    //     {!signedIn && <Button variant="primary" onClick={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODULE, payload: true})}>Sign In</Button>}
                    //     {!signedIn && <Button variant="success" onClick={() => {}}>Sign Up</Button>}
                    //     {signedIn && <Button variant="primary" onClick={handleSignOut}>Sign Out</Button>}
                    //     {console.log(user)}
                    // </Stack>
    //                 <h1 className="google-font-800 text-center fs-1 blue-logo-color">liftlog</h1>
    //                 <Button variant="primary">About</Button>
    //             </Stack>
    //         {/* </div> */}
    //     </nav>
    // );
};

export default SiteNavbar;