import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APP_ACTION_TYPES from '../action-types/app-action-types';

const ViewSetsModal = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {showViewSetsModal} = app_state;
    const {show, exerciseName, exerciseId, exerciseNotes} = showViewSetsModal;

    const [editNotes, setEditNotes] = useState(false);

    function hideModal() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_VIEW_SETS_MODAL, payload: false});
    }

    function handleEditNotes() {
        setEditNotes(true);
    }

    function handleDoneEditNotes() {
        setEditNotes(false);
    }

    const EditNotesForm = () => {

        const [notes, setNotes] = useState(exerciseNotes)
        return (
            <>
                <Form>
                    <Form.Control as="textarea" className="mb-2" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </Form>
                <Button variant="warning" onClick={handleDoneEditNotes}>Done Editing</Button>
            </>
        );
    };

    return (
        <Modal show={show} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{exerciseName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="google-font-800">Exercise Notes:</p>
                {
                    editNotes?
                    <>
                        <EditNotesForm/>
                        
                    </>:
                    <>
                        <p className="google-font-400">{exerciseNotes}</p>
                        <Button variant="info" onClick={handleEditNotes}>Edit Notes</Button>
                    </>
                }
                <hr></hr>
                <p className="google-font-800">Sets:</p>
            </Modal.Body>
        </Modal>
    );
};

export default ViewSetsModal;