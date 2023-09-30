import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from '../action-types/app-action-types';

const AddExerciseCard = () => {

    const {appState, dispatch} = useContext(AppContext);
    const {showAddExerciseForm} = appState;
    
    return (
        <Card className="mx-5 my-3 align-self-start" style={{width: '18rem'}}>
            <Card.Title className="ms-1 mt-1">Add Exercise</Card.Title>
                <Badge
                    pill bg="primary"
                    className="google-font-100 text-white fs-4 w-25 align-self-center mb-1"
                    role="button"
                    onClick={() => dispatch({
                        type: APP_ACTION_TYPES.TOGGLE_ADD_EXERCISE_MODAL,
                        payload: true
                    })}
                >
                    +
                </Badge>
        </Card>
    );
};

export default AddExerciseCard;