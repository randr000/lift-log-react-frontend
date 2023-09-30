import React, { useState, useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APP_ACTION_TYPES from '../../action-types/app-action-types';

const ForgotPasswordModal = () => {

    const {appState, dispatch} = useContext(AppContext);
    const {showForgotPasswordModal} = appState;
    const {auth, email} = showForgotPasswordModal;
    const [error, setError] = useState(false);
    const [resetOk, setResetOk] = useState(false);
    const [updateEmail, setUpdateEmail] = useState(email);

    function handleOnHide() {
        setUpdateEmail('');
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_FORGOT_PASSWORD_MODAL,
            payload: false
        });
    }

    function handleReturnToSignIn() {
        handleOnHide();
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODAL,
            payload: true
        });
    }

    async function handleOnSubmit(event) {
        event.preventDefault();
        try {
            await sendPasswordResetEmail(auth, updateEmail);
            setResetOk(true);
        } catch (e) {
            setError(`Error Code: ${e.code} Error Msg. ${e.message}`);
        }
    }

    return (
        <Modal show={showForgotPasswordModal} onHide={handleOnHide}>
            {
                resetOk ?
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Reset Password Email Sent!</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <p className="google-font-400">
                                An email with instructions on how to reset your password has been sent to
                                the email provided. Plase check your spam folder if you do not see the email in
                                your inbox. Thank you.
                            </p>
                        </Modal.Body>
                        <Modal.Footer className="d-flex flex-column">
                            <div>
                                <Button className="m-1" variant="primary" onClick={handleReturnToSignIn}>Sign In</Button>
                                <Button className="m-1" variant="secondary" onClick={handleOnHide}>Cancel</Button>
                            </div>
                            {
                                error && 
                                <div>
                                    <p className="text-danger fw-bold">Error Reseting Password</p>
                                    <p className="text-danger fw-bold">{error}</p>
                                </div>
                            }
                        </Modal.Footer>
                    </Form>
                </> :
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Request Password Reset</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => handleOnSubmit(e)}>
                        <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} />
                        </Form.Group>
                        </Modal.Body>
                        <Modal.Footer className="d-flex flex-column">
                            <div>
                                <Button className="m-1" type="submit" variant="primary">Reset Password</Button>
                                <Button className="m-1" variant="secondary" onClick={handleOnHide}>Cancel</Button>
                            </div>
                            {
                                error && 
                                <div>
                                    <p className="text-danger fw-bold">Error Reseting Password</p>
                                    <p className="text-danger fw-bold">{error}</p>
                                </div>
                            }
                        </Modal.Footer>
                    </Form>
                </>
            }
            {console.log(resetOk)}
        </Modal>
    );
};

export default ForgotPasswordModal;