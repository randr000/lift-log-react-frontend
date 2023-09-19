import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const AddExerciseCard = () => {
    return (
        <Card className="mx-5 my-3" style={{width: '18rem'}}>
            <Card.Title className="ms-1 mt-1">Add Exercise</Card.Title>
                <Badge
                    pill bg="primary"
                    className="google-font-100 text-white fs-4 w-25 align-self-center mb-1"
                    role="button">
                    +
                </Badge>
        </Card>
    );
};

export default AddExerciseCard;