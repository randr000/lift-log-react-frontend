import React, { useState, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import APP_ACTION_TYPES from "../../action-types/app-action-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const AddExerciseFormModal = () => {

    const {appState, dispatch} = useContext(AppContext);
    const {user, showAddExerciseForm} = appState;

    const [exerciseName, setExerciseName] = useState('');
    const [exerciseNotes, setExerciseNotes] = useState('');

    async function handleAddExercise(event) {
        event.preventDefault();
        try {
            const collectionRef = collection(db, `users/${user.uid}/exercises`);
            const payload = {name: exerciseName, notes: exerciseNotes};
            await addDoc(collectionRef, payload);
            dispatch({type: APP_ACTION_TYPES.TOGGLE_ADD_EXERCISE_MODAL, payload: false})
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <Modal show={showAddExerciseForm} onHide={() => dispatch({type: APP_ACTION_TYPES.TOGGLE_ADD_EXERCISE_MODAL, payload: false})}>
            <Modal.Header closeButton>
                <Modal.Title>Add Exercise</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAddExercise}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formExerciseName">
                        <Form.Label>Exercise Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Exercise Name" onChange={(e) => setExerciseName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formExerciseNotes">
                        <Form.Label>Exercise Notes</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter Exercise Notes" row={3} onChange={(e) => setExerciseNotes(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="m-1" type="submit" variant="primary">Add Exercise</Button>
                    <Button className="m-1" variant="secondary" onClick={() => dispatch({
                        type: APP_ACTION_TYPES.TOGGLE_ADD_EXERCISE_MODAL,
                        payload: false
                    })}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddExerciseFormModal;