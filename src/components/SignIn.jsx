import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SignIn = ({showSignIn, setShowSignIn}) => {

    const hideSignIn = () => setShowSignIn(false);

    return (
        <Modal show={showSignIn} onHide={hideSignIn}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal body text goes here</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Sign In</Button>
                    <Button variant="secondary" onClick={hideSignIn}>Close</Button>
                </Modal.Footer>
        </Modal>
    );
};

export default SignIn;