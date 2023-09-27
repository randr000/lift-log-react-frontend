import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useState, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from '../action-types/app-action-types';

const ExerciseCard = ({id, name}) => {

    const {app_state, dispatch} = useContext(AppContext);
    const {user, showViewSetsModal} = app_state;

    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

    function handleAccordionClick() {
        setIsAccordionExpanded(state => !state);
    }

    function handleViewSetsClick() {
        dispatch({type: APP_ACTION_TYPES.TOGGLE_VIEW_SETS_MODAL, payload: {show: true, exerciseId: id, exerciseName: name}});
    }

    return (
        <Card className="mx-5 my-3" style={{width: '18rem'}}>
            <Card.Title className="ms-1 mt-1" onClick={handleViewSetsClick}>{name}</Card.Title>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header onClick={handleAccordionClick}>
                        {isAccordionExpanded ? "Collapse" : "Expand"}
                    </Accordion.Header>
                    <Accordion.Body onClick={handleViewSetsClick}>
                        <h1>Max Weight: 15 lbs. (Each Arm)</h1>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Card>
    );
};

export default ExerciseCard;