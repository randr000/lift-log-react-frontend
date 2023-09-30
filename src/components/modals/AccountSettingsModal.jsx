import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import APP_ACTION_TYPES from "../../action-types/app-action-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const AccountSettingsModal = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {showAccountSettingsModal, user, displayName} = app_state;

    function handleOnHide() {
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_ACCOUNT_SETTINGS_MODAL,
            payload: false
        });
    }

    function handlePasswordReset() {
        return;
    }

    function handleDeleteUser() {
        return;
    }

    return (
        <Modal show={showAccountSettingsModal} onHide={handleOnHide}>
            <Modal.Header closeButton>
                <Modal.Title>{`${displayName}'${/s/i.test(displayName[displayName.length-1]) ? '' : 's'} Account Settings`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button className="m-1" variant="primary" onClick={handlePasswordReset}>Reset Password</Button>
                <Button className="m-1" variant="danger" onClick={handlePasswordReset}>Delete Profile</Button>
            </Modal.Body>
        </Modal>
    );
};

export default AccountSettingsModal;