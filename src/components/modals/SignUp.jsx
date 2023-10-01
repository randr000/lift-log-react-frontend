import React, { useState, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../firebase";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APP_ACTION_TYPES from "../../action-types/app-action-types";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {

    const {appState, dispatch} = useContext(AppContext);
    const {showSignUp, signUpError, showOffCanvas} = appState;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSignup(event) {
        event.preventDefault();
        try {
            
            const displayName = name.trim();

            if (!displayName) {
                dispatch({
                    type: APP_ACTION_TYPES.SIGN_UP_UNSUCCESSFUL,
                    payload: `Must enter a name!`
                });
                return;
            }

            if (password !== confirmPassword) {
                dispatch({
                    type: APP_ACTION_TYPES.SIGN_UP_UNSUCCESSFUL,
                    payload: `Passwords do not match!`
                });
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, confirmPassword);
            const user = userCredential.user;
            await sendEmailVerification(user);
            const docRef = doc(db, `users`, user.uid);
            const payload = {display_name: displayName};
            await setDoc(docRef, payload);
            dispatch({type: APP_ACTION_TYPES.SIGN_UP_SUCCESSFUL, payload: user});
            dispatch({type: APP_ACTION_TYPES.TOGGLE_SHOW_OFF_CANVAS, payload: false});
            
        } catch (e) {
            
            const errorCode = e.code;
            const errorMessage = e.message;

            dispatch({
                type: APP_ACTION_TYPES.SIGN_UP_UNSUCCESSFUL,
                payload: `Error Code: ${errorCode} Error Msg.: ${errorMessage}`
            });
        }
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
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
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
                            <Button className="m-1" variant="secondary" onClick={handleOnHide}>Cancel</Button>
                        </div>
                        {
                            signUpError && 
                            <div>
                                <p className="text-danger fw-bold">Sign Up Error</p>
                                <p className="text-danger fw-bold">{signUpError}</p>
                            </div>
                        }
                        {
                            password !== confirmPassword && password !== '' && confirmPassword !== '' &&
                            <p className="text-danger fw-bold">Passwords do not match!</p>
                        }
                    </Modal.Footer>
                </Form>
        </Modal>
    );
};

export default SignUp;