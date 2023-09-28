import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from '../action-types/app-action-types';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const ExerciseCard = ({id}) => {

    const {app_state, dispatch} = useContext(AppContext);
    const {user} = app_state;

    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
    const [exerciseDoc, setExerciseDoc] = useState({});

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
        dispatch({type: APP_ACTION_TYPES.TOGGLE_VIEW_SETS_MODAL, payload: {
            show: true, exerciseId: id, exerciseName: exerciseDoc.name, exerciseNotes: exerciseDoc.notes}});
    }

    return (
        <Card className="mx-5 my-3" style={{width: '18rem'}}>
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
    );
};

export default ExerciseCard;