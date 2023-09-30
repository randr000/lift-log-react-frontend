import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from '../action-types/app-action-types';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

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
            // handleOnHide();
        } catch (e) {
            setError(e.message);
        }
    }

    function handleEditRepLine(idx, event) {
        const {name, value} = event.target;
        return;
    }

    function handleDeleteRepLine(idx, event) {
        const {name, value} = event.target;
        return;
    }

    return (
        <Modal show={showEditSetModal} onHide={handleOnHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Set</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {
                        repLines.map((line, idx) => {
                            return (
                                <div className="d-flex flex-row" key={idx}>
                                    <Form.Group>
                                        <Form.Label>Reps</Form.Label>
                                        <Form.Control className="w-50" type="number" name="weight" value={line.reps} onChange={(e) => handleEditRepLine(idx, e)}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control className="w-50" type="number" name="weight" value={line.weight} onChange={(e) => handleEditRepLine(idx, e)}/>
                                    </Form.Group>
                                    <Badge
                                        pill bg="danger"
                                        className="google-font-100 text-white fs-4 w-25 align-self-center mb-1 display"
                                        role="button"
                                        onClick={(e) => handleDeleteRepLine(idx, e)}
                                    >
                                        -
                                    </Badge>
                                </div>
                            );
                        })
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" className="m-1" onClick={handleConfirmEdit}>Confirm Edit</Button>
                <Button variant="danger" className="m-1" onClick={handleOnHide}>Cancel</Button>
                {error && <p className="text-danger fw-bold fs-5 my-2">{error}</p>}
            </Modal.Footer>
        </Modal>
    );
};

export default EditSetModal;