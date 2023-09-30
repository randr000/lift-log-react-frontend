import React, { useState, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APP_ACTION_TYPES from '../action-types/app-action-types';

const SignIn = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {showSignIn, signInError} = app_state;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                dispatch({type: APP_ACTION_TYPES.SIGN_IN_SUCCESSFUL, payload: user});
                console.log(user);
            })
            .catch((error) => {
                dispatch({type: APP_ACTION_TYPES.SIGN_IN_UNSUCCESSFUL});
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    function handleOnHide() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODAL, payload: false})
    }

    return (
        <Modal show={showSignIn} onHide={handleOnHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleLogin}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="d-flex flex-column">
                        <div>
                            <Button className="m-1" type="submit" variant="primary">Sign In</Button>
                            <Button className="m-1" variant="secondary" onClick={() => dispatch({
                                    type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODAL,
                                    payload: false
                                    })}
                            >
                                Cancel
                            </Button>
                        </div>
                        {signInError && <p className="text-danger fw-bold">Wrong Email or Password</p>}
                    </Modal.Footer>
                </Form>
        </Modal>
    );
};

export default SignIn;