import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const ExerciseCard = () => {
    return (
        <Card className="mx-5 my-3" style={{width: '18rem'}}>
            <Card.Title className="ms-1 mt-1">Dumbbell Flye</Card.Title>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Body>
                        <h1>Max Weight: 15 lbs. (Each Arm)</h1>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Card>
    );
};

export default ExerciseCard;