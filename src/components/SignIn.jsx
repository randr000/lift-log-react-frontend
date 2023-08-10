import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { setUserProperties } from 'firebase/analytics';

const SignIn = ({showSignIn, setShowSignIn}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const hideSignIn = () => setShowSignIn(false);

    const handleLogin = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                hideSignIn();
                console.log(user);
            })
            .catch((error) => {
                setError(true);
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <Modal show={showSignIn} onHide={hideSignIn}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleLogin}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">Sign In</Button>
                        <Button variant="secondary" onClick={hideSignIn}>Close</Button>
                        {error && <span>Wrong Email or Password</span>}
                    </Modal.Footer>
                </Form>
        </Modal>
    );
};

export default SignIn;