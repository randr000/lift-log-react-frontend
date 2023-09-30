import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from '../action-types/app-action-types';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EditSetModal = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {showEditSetModal} = app_state;
    const {colPath, docId, sets} = showEditSetModal;
    const [repLines, setRepLines] = useState(sets);
    const [error, setError] = useState(false);

    function handleOnHide() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_EDIT_SET_MODAL, payload: false});
    }

    async function handleConfirmEdit() {
        try {
            const docRef = doc(db, colPath, docId);
            const payload = {sets: repLines.filter(set => set.reps && set), date: docId};
            await updateDoc(docRef, payload);
            handleOnHide();
        } catch (e) {
            setError(e.message);
        }
    }

    function handleEditRepLine(idx, event) {
        const {name, value} = event.target;
        const arr = [...repLines];
        arr[idx][name] = value;
        setRepLines(arr);
    }

    function handleAddRepLine() {
        setRepLines(prev => [...prev, {
            reps: '',
            weight: ''
        }]);
    }

    function handleDeleteRepLine(idx) {
        const arr = [...repLines];
        arr.splice(idx, 1);
        setRepLines(arr);
    }

    return (
        <Modal show={showEditSetModal} onHide={handleOnHide}>
            <Modal.Header closeButton>
                <Modal.Title>{`Edit Set: ${docId}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {
                        repLines.map((line, idx) => {
                            return (
                                <div className="d-flex flex-row mt-2" key={idx}>
                                    <Form.Group>
                                        <Form.Label>Reps</Form.Label>
                                        <Form.Control className="w-50" type="number" name="reps" value={line.reps} onChange={(e) => handleEditRepLine(idx, e)}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control className="w-50" type="number" name="weight" value={line.weight} onChange={(e) => handleEditRepLine(idx, e)}/>
                                    </Form.Group>
                                    <Badge
                                        pill bg="danger"
                                        className="google-font-100 text-white fs-4 w-25 align-self-center mb-1 display"
                                        role="button"
                                        onClick={() => handleDeleteRepLine(idx)}
                                    >
                                        -
                                    </Badge>
                                </div>
                            );
                        })
                    }
                </Form>
                <Badge
                    pill bg="success"
                    className="google-font-100 text-white fs-4 w-25 align-self-center mt-3 display"
                    role="button"
                    onClick={handleAddRepLine}
                >
                    +
                </Badge>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" className="m-1" onClick={handleConfirmEdit}>Confirm Edit</Button>
                <Button variant="danger" className="m-1" onClick={handleOnHide}>Cancel</Button>
            </Modal.Footer>
            {error && <p className="text-danger text-center fw-bold fs-5 my-2">{error}</p>}
        </Modal>
    );
};

export default EditSetModal;