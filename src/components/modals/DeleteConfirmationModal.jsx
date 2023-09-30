import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AppContext from '../../contexts/AppContext';
import APP_ACTION_TYPES from '../../action-types/app-action-types';
import { doc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase';

const DeleteConfirmationModal = () => {

    const {appState, dispatch} = useContext(AppContext);
    const {showDeleteConfirmModal, user} = appState;
    const {colPath, docId, type} = showDeleteConfirmModal;
    
    // let docId;
    // if (type === 'set') docId = showDeleteConfirmModal.docId;

    const [error, setError] = useState(false);
    
    function handleOnHide() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_DELETE_CONFIRM_MODAL, payload: false});
    }

    async function handleDelete() {
        if (type === 'set') {
            try {
                await deleteDoc(doc(db, colPath, docId));
                setError(false);
                handleOnHide();
                return;
            } catch (e) {
                setError(e.message);
            }
        }

        if (type === 'exercise') {
            try {
                const batch = writeBatch(db);
                const sets = showDeleteConfirmModal.sets;
                
                for (let set of sets) {
                    batch.delete(doc(db, colPath, set.dateStr));
                }
                
                const exerciseDocRef = doc(db, `users/${user.uid}/exercises`, docId);
                batch.delete(exerciseDocRef);

                await batch.commit();
                handleOnHide();
                return;
            } catch (e) {
                setError(e.message);
            }
        }
    }
    
    return (
        <Modal show={showDeleteConfirmModal} onHide={handleOnHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="google-font-800">
                    {`
                        Are you sure you want to delete this ${type}? This action cannot be undone.
                        All information about this ${type} will be deleted.
                        ${
                            type === 'exercise' ?
                            'This includes all sets saved for this exercise as well.' :
                            ''
                        }
                    `}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" className="m-1" onClick={handleDelete}>Delete</Button>
                <Button variant="success" className="m-1" onClick={handleOnHide}>Cancel</Button>
                {error && <p className="text-danger fw-bold fs-5 my-2">{error}</p>}
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;