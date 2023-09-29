import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from '../action-types/app-action-types';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ExerciseCard = ({id}) => {

    const {app_state, dispatch} = useContext(AppContext);
    const {user} = app_state;

    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
    const [exerciseDoc, setExerciseDoc] = useState({});
    const [showSets, setShowSets] = useState(false);
    const [editNotes, setEditNotes] = useState(false);
    const [draftNotes, setDraftNotes] = useState(exerciseDoc.notes);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, `users/${user.uid}/exercises/${id}`), doc => {
            setExerciseDoc(doc.data());
        });
        return unsub;
    }, []);

    function handleAccordionClick() {
        setIsAccordionExpanded(state => !state);
    }

    function handleViewSetsClick() {
        setShowSets(true);
    }

    function handleEditNotes() {
        setEditNotes(true);
    }

    async function handleDoneEditNotes(editedNotes) {
        const docRef = doc(db, `users/${user.uid}/exercises`,`${id}`);
        const payload = {notes: editedNotes};
        await updateDoc(docRef, payload);
        setEditNotes(false);
    }

    return (
        <>

            <Card className="mx-5 my-3 align-self-start" style={{width: '18rem'}}>
                <Card.Title className="ms-1 mt-1" onClick={handleViewSetsClick} style={{cursor: "pointer"}}>{exerciseDoc.name}</Card.Title>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={handleAccordionClick}>
                            {isAccordionExpanded ? "Collapse" : "Expand"}
                        </Accordion.Header>
                        <Accordion.Body onClick={handleViewSetsClick} style={{cursor: "pointer"}}>
                            <h1>{exerciseDoc.notes}</h1>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card>

            <Modal show={showSets} onHide={() => setShowSets(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{exerciseDoc.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="google-font-800">Exercise Notes:</p>
                    {
                        editNotes ?
                        <>
                            <Form>
                                <Form.Control as="textarea" className="mb-2" value={draftNotes || exerciseDoc.notes} onChange={(e) => setDraftNotes(e.target.value)} />
                            </Form>
                            <Button variant="warning" onClick={() => handleDoneEditNotes(draftNotes)}>Done Editing</Button>
                        </> :
                        <>
                            <p className="google-font-400">{exerciseDoc.notes}</p>
                            <Button variant="info" onClick={handleEditNotes}>Edit Notes</Button>
                        </>
                    }
                    <hr></hr>
                    <p className="google-font-800">Sets:</p>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default ExerciseCard;