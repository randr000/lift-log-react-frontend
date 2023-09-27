import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';

const ExerciseCard = ({name}) => {

    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

    function handleAccordionClick() {
        setIsAccordionExpanded(state => !state);
    }

    return (
        <Card className="mx-5 my-3" style={{width: '18rem'}}>
            <Card.Title className="ms-1 mt-1">{name}</Card.Title>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header onClick={handleAccordionClick}>
                        {isAccordionExpanded ? "Collapse" : "Expand"}
                    </Accordion.Header>
                    <Accordion.Body>
                        <h1>Max Weight: 15 lbs. (Each Arm)</h1>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Card>
    );
};

export default ExerciseCard;