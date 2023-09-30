import React, { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import APP_ACTION_TYPES from "../../action-types/app-action-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const PasswordResetModal = () => {

    const {appState, dispatch} = useContext(AppContext);
    const {showPasswordResetModal, user} = appState;
    const {signedIn} = showPasswordResetModal;

    function handleOnHide() {
        handleSignOut();
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_PASSWORD_RESET_MODAL,
            payload: false
        });
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_ACCOUNT_SETTINGS_MODAL,
            payload: false
        });
    }

    function handleSignOut() {
        signOut(auth);
        dispatch({type: APP_ACTION_TYPES.SIGN_OUT});
    }

    function handleReturnToSignIn() {
        handleOnHide();
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_SIGN_IN_MODAL,
            payload: true
        });
    }

    return (
        <Modal show={showPasswordResetModal} onHide={handleOnHide}>
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
                    {signedIn && <p className="google-font-400">You have also been signed out.</p>}
                </Modal.Body>
                <Modal.Footer className="d-flex flex-column">
                    <div>
                        <Button className="m-1" variant="primary" onClick={handleReturnToSignIn}>Sign In</Button>
                        <Button className="m-1" variant="secondary" onClick={handleOnHide}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default PasswordResetModal;