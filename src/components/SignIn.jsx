import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignIn = ({showSignIn, setShowSignIn}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const hideSignIn = () => setShowSignIn(false);

    const handleLogin = (event) => {
        event.preventDefault();
    };

    return (
        <Modal show={showSignIn} onHide={hideSignIn}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Sign In</Button>
                    <Button variant="secondary" onClick={hideSignIn}>Close</Button>
                </Modal.Footer>
        </Modal>
    );
};

export default SignIn;