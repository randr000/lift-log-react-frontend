import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APP_ACTION_TYPES from '../action-types/app-action-types';

const ViewSetsModal = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {showViewSetsModal} = app_state;
    const {show, exerciseName, exerciseId} = showViewSetsModal;

    function hideModal() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_VIEW_SETS_MODAL, payload: false});
    }

    return (
        <Modal show={show} onHide={hideModal}>
            <Modal.Title>{exerciseName}</Modal.Title>
        </Modal>
    );
};

export default ViewSetsModal;