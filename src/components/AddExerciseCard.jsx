import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AddExerciseCard = () => {
    return (
        <Card className="mx-5 my-3" style={{width: '18rem'}}>
            <Card.Title>Add Exercise</Card.Title>
            <Button variant="primary">Add</Button>
        </Card>
    );
};

export default AddExerciseCard;