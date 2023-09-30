import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import APP_ACTION_TYPES from '../action-types/app-action-types';
import { collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import EditSetModal from './EditSetModal';

const ExerciseCard = ({id}) => {

    const {app_state, dispatch} = useContext(AppContext);
    const {user, showEditSetModal} = app_state;

    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
    const [exerciseDoc, setExerciseDoc] = useState({});
    const [showSets, setShowSets] = useState(false);
    const [editName, setEditName] = useState(false);
    const [draftName, setDraftName] = useState('');
    const [editNotes, setEditNotes] = useState(false);
    const [draftNotes, setDraftNotes] = useState('');
    const [showAddSetForm, setShowAddSetForm] = useState(false);
    const [repLinesFormInput, setRepLinesFormInput] = useState([]);
    const [allRepsValue, setAllRepsValue] = useState('');
    const [allWeightValue, setAllWeightValue] = useState('');
    const [submitAddSetsError, setSubmitAddSetsError] = useState(false);
    const [sets, setSets] = useState([]);
    const [date, setDate] = useState(0);


    useEffect(() => {
        const unsub = onSnapshot(doc(db, `users/${user.uid}/exercises/${id}`), doc => {
            setExerciseDoc(doc.data());
        });
        return unsub;
    }, []);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, `users/${user.uid}/exercises/${id}/sets`), snapshot => {
            setSets(snapshot.docs.map(doc => ({...doc.data(), dateStr: doc.id, dateStamp: Date.parse(doc.id)})));
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

    function handleEditName() {
        setEditName(true);
    }

    async function handleDoneEditNotes(editedNotes) {
        if (editedNotes) {
            const docRef = doc(db, `users/${user.uid}/exercises`,`${id}`);
            const payload = {notes: editedNotes};
            await updateDoc(docRef, payload);
        }
        setEditNotes(false);
    }

    async function handleDoneEditName(editedName) {
        if (editedName) {
            const docRef = doc(db, `users/${user.uid}/exercises`, `${id}`);
            const payload = {name: editedName};
            await updateDoc(docRef, payload);
        }
        setEditName(false);
    }

    function handleShowAddSetForm() {
        setShowAddSetForm(true);
    }

    async function handleSubmitAddSetForm() {
        try {
            if (!date) {
                setSubmitAddSetsError('You must select a date before submitting!');
                return;
            } else setSubmitAddSetsError(false);

            if (!repLinesFormInput.length) {
                setSubmitAddSetsError('You must add at least one set before submitting!');
                return;
            } else {
                const payload = {sets: repLinesFormInput.filter(set => set.reps && set), date: date};
                const docRef = doc(db, `users/${user.uid}/exercises/${id}/sets`, date);
                await setDoc(docRef, payload, {merge: true});
                setSubmitAddSetsError(false);
                setDate(false);
                setRepLinesFormInput([]);
            }

            setShowAddSetForm(false);
        } catch (e) {
            setSubmitAddSetsError(e.message);
        }
    }

    function handleEditSet(setId) {
        const collection = `users/${user.uid}/exercises/${id}/sets`;
        dispatch({
            type: APP_ACTION_TYPES.TOGGLE_EDIT_SET_MODAL,
            payload: {colPath: collection, docId: setId, sets: sets.filter(set => set.dateStr === setId)[0].sets}
        });
    }

    function handleDeleteSet(setId) {
        const collection = `users/${user.uid}/exercises/${id}/sets`;
        dispatch({type: APP_ACTION_TYPES.TOGGLE_DELETE_CONFIRM_MODAL, payload: {colPath: collection, docId: setId, type: 'set'}});
    }

    function handleDeleteExercise() {
        const collection = `users/${user.uid}/exercises/${id}/sets`;
        dispatch({type: APP_ACTION_TYPES.TOGGLE_DELETE_CONFIRM_MODAL, payload: {colPath: collection, docId: id, type: 'exercise', sets: sets}});
    }

    function handleHideAddSetForm() {
        setShowAddSetForm(false);
    }

    function handleAddRepLine() {
        setRepLinesFormInput(prev => [...prev, {
            reps: allRepsValue,
            weight: allWeightValue}]);
    }

    function handleEditRepLine(idx, event) {
        const {name, value} = event.target;
        const arr = [...repLinesFormInput];
        arr[idx][name] = value;
        setRepLinesFormInput(arr);
    }

    function handleDeleteRepLine(idx, event) {
        const arr = [...repLinesFormInput];
        arr.splice(idx, 1);
        setRepLinesFormInput(arr);
    }

    function handleUpdateAllReps(value) {
        setRepLinesFormInput(prev => {
            return prev.map(row => ({...row, reps: value}));
        });
        setAllRepsValue(value);
    }

    function handleUpdateAllWeight(value) {
        setRepLinesFormInput(prev => {
            return prev.map(row => ({...row, weight: value}));
        });
        setAllWeightValue(value);
    }

    function handleDateChange(event) {
        setDate(event.target.value);
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
                    
                    {
                        editName ?
                        <>
                            <Modal.Title>
                                <Form>
                                    <Form.Control type="text" className="mb-2" value={draftName || exerciseDoc.name} onChange={(e) => setDraftName(e.target.value)} />
                                </Form>
                            </Modal.Title>
                            <Button className="ms-2" variant="warning" onClick={() => handleDoneEditName(draftName)}>Done Editing</Button>
                        </> :
                        <>
                            <Modal.Title>{exerciseDoc.name}</Modal.Title>
                            <Button className="ms-2" variant="info" onClick={handleEditName}>Edit Name</Button>
                            <Button className="ms-2" variant="danger" onClick={handleDeleteExercise}>Delete Exercise</Button>
                        </>
                    }
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
                    <div className="d-flex flex-row">
                        <p className="google-font-800">Sets:</p>
                        {!showAddSetForm && <Button className="ms-2" variant="primary" onClick={handleShowAddSetForm}>Add Sets</Button>}
                        {
                            showAddSetForm &&
                            <div>
                                <Button className="ms-2" variant="success" onClick={handleSubmitAddSetForm}>Done</Button>
                                <Button className="ms-2" variant="danger" onClick={handleHideAddSetForm}>Cancel</Button>
                            </div>
                        }
                    </div>
                    {
                        showAddSetForm &&
                        <Form>
                            <Form.Group>
                                <Form.Label>Date:</Form.Label>
                                <Form.Control className="w-50 w-sm-25" type="date" value={date} onChange={e => handleDateChange(e)}/>
                            </Form.Group>
                            <div className="d-flex flex-row mt-2">
                                <Form.Group>
                                    <Form.Label>Update All Reps:</Form.Label>
                                    <Form.Control className="w-50" type="number" onChange={e => handleUpdateAllReps(e.target.value)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Update All Weight:</Form.Label>
                                    <Form.Control className="w-50" type="number" onChange={e => handleUpdateAllWeight(e.target.value)}/>
                                </Form.Group>
                                    <Badge
                                        pill bg="success"
                                        className="google-font-100 text-white fs-4 w-25 align-self-center mb-1 display"
                                        role="button"
                                        onClick={handleAddRepLine}
                                    >
                                        +
                                    </Badge>
                            </div>
                            {repLinesFormInput.map((data, idx) => {
                                return (
                                    <div key={idx} className="d-flex flex-row mt-2">
                                        <Form.Group>
                                            <Form.Label>Reps:</Form.Label>
                                            <Form.Control className="w-50" type="number" name="reps" value={data.reps} onChange={(e) => handleEditRepLine(idx, e)}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Weight:</Form.Label>
                                            <Form.Control className="w-50" type="number" name="weight" value={data.weight} onChange={(e) => handleEditRepLine(idx, e)}/>
                                        </Form.Group>
                                            <Badge
                                                pill bg="danger"
                                                className="google-font-100 text-white fs-4 w-25 align-self-center mb-1 display"
                                                role="button"
                                                onClick={(e) => handleDeleteRepLine(idx, e)}
                                            >
                                                -
                                            </Badge>
                                    </div>
                            )})}
                            {submitAddSetsError && <p className="text-danger fw-bold fs-5 my-2">{submitAddSetsError}</p>}
                        </Form>
                    }
                   {
                        sets.sort((a, b) => b.dateStamp - a.dateStamp).map((dailySets) => {
                            return (
                                <div key={dailySets.dateStr}>
                                    <hr/>
                                    <p className="google-font-800 text-center">{dailySets.dateStr}</p>
                                    <div className="d-flex justify-content-center">
                                        <Button variant="info" className="me-4" onClick={() => handleEditSet(dailySets.dateStr)}>Edit Sets</Button>
                                        <Button variant="danger" className="ms-4" onClick={() => handleDeleteSet(dailySets.dateStr)}>Delete Sets</Button>
                                    </div>
                                    <div className="d-flex justify-content-evenly">
                                        <p className="google-font-500 text-decoration-underline">Reps</p>
                                        <p className="google-font-500 text-decoration-underline">Weight</p>
                                    </div>
                                    {
                                        // dailySets[0].map((set, idx) => {
                                        dailySets.sets.map((set, idx) => {
                                            return (
                                                <div key={idx} className="d-flex justify-content-evenly">
                                                    <p className="google-font-400">{set.reps}</p>
                                                    <p className="google-font-400">{set.weight}</p>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                
                            );
                        })
                   }
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ExerciseCard;