import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AppContext from '../../contexts/AppContext';
import APP_ACTION_TYPES from '../../action-types/app-action-types';
import { doc, deleteDoc, writeBatch, getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { deleteUser } from 'firebase/auth';

const DeleteConfirmationModal = () => {

    const {appState, dispatch} = useContext(AppContext);
    const {showDeleteConfirmModal, user} = appState;
    const {colPath, docId, type} = showDeleteConfirmModal;

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
                setError(`Error Code: ${e.code} Error Msg. ${e.message}`);
            }
        }

        if (type === 'user') {
            try {
                const batch = writeBatch(db);
                const exercisesColPath = `users/${docId}/exercises`;
                
                const exercises = await getDocs(collection(db, exercisesColPath));

                /* Probably not the best way, but Firebase does not delete all subcollections even if parent 
                   document is deleted. You also cannot delete all of a collection's documents by 
                   deleting the collection. */
                for (let exercise of exercises.docs) {
                    let sets = await getDocs(collection(db, `users/${docId}/exercises/${exercise.id}/sets`));
                    
                    for (let set of sets.docs) {
                        // Delete the set documents
                        batch.delete(doc(db, `${exercisesColPath}/${exercise.id}/sets`, `${set.id}`));
                    }
                    // Delete the exercise document
                    batch.delete(doc(db, exercisesColPath, exercise.id));
                }

                // Delete user document in firestore
                batch.delete(doc(db, colPath, docId));

                await batch.commit();

                // Actually deletes user in firebase authentication
                await deleteUser(user);

                dispatch({
                    type: APP_ACTION_TYPES.TOGGLE_ACCOUNT_SETTINGS_MODAL,
                    payload: false
                });

                dispatch({type: APP_ACTION_TYPES.SIGN_OUT});
                handleOnHide();
                return;

            } catch (e) {
                console.log(e)
                setError(`Error Code: ${e.code} Error Msg. ${e.message}`);
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
                            type === 'user' ?
                            'This includes all exercises and sets saved for this user. This action cannot be undone and information cannot be recoverd later.' :
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