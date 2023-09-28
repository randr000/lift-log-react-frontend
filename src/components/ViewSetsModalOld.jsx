import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APP_ACTION_TYPES from '../action-types/app-action-types';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ViewSetsModal = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {user, showViewSetsModal} = app_state;
    const {show, exerciseName, exerciseId, exerciseNotes} = showViewSetsModal;

    const [editNotes, setEditNotes] = useState(false);

    function hideModal() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_VIEW_SETS_MODAL, payload: false});
    }

    function handleEditNotes() {
        setEditNotes(true);
    }

    async function handleDoneEditNotes(editedNotes) {
        try {
            setEditNotes(false);
            dispatch({type: APP_ACTION_TYPES.DONE_EDITING_NOTES, payload: editedNotes});
            // const docRef = doc(db, `users/${user.uid}/exercises/${exerciseId}`);
            // const payload = {notes: editNotes};
            // await updateDoc(docRef, payload);
        } catch (e) {
            console.log(e.message);
        }
    }

    const EditNotesForm = () => {

        const [notes, setNotes] = useState(exerciseNotes)
        return (
            <>
                <Form>
                    <Form.Control as="textarea" className="mb-2" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </Form>
                <Button variant="warning" onClick={() => handleDoneEditNotes(notes)}>Done Editing</Button>
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
                    <EditNotesForm/>:
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