import React, { useState, useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APP_ACTION_TYPES from '../../action-types/app-action-types';

const SignIn = () => {

    const {appState, dispatch} = useContext(AppContext);
    const {showSignIn, signInError} = appState;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            dispatch({type: APP_ACTION_TYPES.SIGN_IN_SUCCESSFUL, payload: user});

        } catch (e) {
            const errorCode = e.code;
            const errorMessage = e.message;
            dispatch({
                type: APP_ACTION_TYPES.SIGN_IN_UNSUCCESSFUL,
                payload: `Error Code: ${errorCode} Error Msg.: ${errorMessage}`
            });
        }
    };

    function handleOnHide() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODAL, payload: false})
    }

    function handleForgotPassword(auth, email) {
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_FORGOT_PASSWORD_MODAL,
            payload: {auth: auth, email: email}
        });
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
                            <Button className="m-1" variant="info" onClick={() => handleForgotPassword(auth, email)}>Forgot Password</Button>
                            <Button className="m-1" variant="secondary" onClick={handleOnHide}>Cancel</Button>
                        </div>
                        {
                            signInError &&
                            <div>
                                <p className="text-danger fw-bold">Sign In Error</p>
                                <p className="text-danger fw-bold">{signInError}</p>
                            </div>
                        }
                    </Modal.Footer>
                </Form>
        </Modal>
    );
};

export default SignIn;