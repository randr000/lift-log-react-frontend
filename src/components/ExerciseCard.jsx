import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ExerciseCard = () => {
    return (
        <Card className="mx-5 my-3" style={{width: '18rem'}}>
            <Card.Title className="ms-1 mt-1">Dumbbell Flye</Card.Title>
        </Card>
    );
};

export default ExerciseCard;