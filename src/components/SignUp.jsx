import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APP_ACTION_TYPES from "../action-types/app-action-types";

const SignUp = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {showSignUp, signUpError} = app_state;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = (event) => {
        event.preventDefault();
    };

    function handleOnHide() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_UP_MODAL, payload: false})
    }

    return (
        <Modal show={showSignUp} onHide={handleOnHide}>
                <Modal.Header closeButton>
                    <Modal.Title data-testid="sign-up-title">Sign Up</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSignup}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="d-flex flex-column">
                        <div>
                            <Button className="m-1" type="submit" variant="primary">Sign Up</Button>
                            <Button className="m-1" variant="secondary" onClick={() => dispatch({
                                    type: APP_ACTION_TYPES.TOGGLE_SIGN_UP_MODAL,
                                    payload: false
                                    })}
                            >
                                Cancel
                            </Button>
                        </div>
                        {signUpError && <p className="text-danger fw-bold">Sign Up Error</p>}
                    </Modal.Footer>
                </Form>
        </Modal>
    );
};

export default SignUp;