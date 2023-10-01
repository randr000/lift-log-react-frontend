import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import APP_ACTION_TYPES from "../../action-types/app-action-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const AccountSettingsModal = () => {

    const {appState, dispatch} = useContext(AppContext);
    const {showAccountSettingsModal, user, displayName} = appState;
    const [error, setError] = useState(false);

    function handleOnHide() {
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_ACCOUNT_SETTINGS_MODAL,
            payload: false
        });
    }

    async function handlePasswordReset() {
        try {
            await sendPasswordResetEmail(auth, user.email);
            dispatch({
                type: APP_ACTION_TYPES.TOGGLE_PASSWORD_RESET_MODAL,
                payload: {signedIn: true}
            });
        } catch (e) {
            setError(`Error Code: ${e.code} Error Msg. ${e.message}`);
        }
    }

    function handleDeleteUser() {
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_DELETE_CONFIRM_MODAL,
            payload: {colPath: 'users', docId: user.uid, type: 'user'}
        });
    }

    return (
        <Modal show={showAccountSettingsModal} onHide={handleOnHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {`${displayName}'${/s/i.test(displayName[displayName.length-1]) ? '' : 's'} Account Settings`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button className="m-1" variant="primary" onClick={handlePasswordReset}>Reset Password</Button>
                <Button className="m-1" variant="danger" onClick={handleDeleteUser}>Delete Profile</Button>
            </Modal.Body>
                {
                    error &&
                    <Modal.Footer>
                        <div>
                            <p className="text-danger fw-bold">Error Reseting Password</p>
                            <p className="text-danger fw-bold">{error}</p>
                        </div>
                    </Modal.Footer>
                }
        </Modal>
    );
};

export default AccountSettingsModal;