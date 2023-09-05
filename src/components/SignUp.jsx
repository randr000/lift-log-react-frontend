import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APP_ACTION_TYPES from "../action-types/app-action-types";

const SignUp = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {showSignUp, signUpError} = app_state;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const handleSignup = (event) => {
        event.preventDefault();
    };
    
    return (
        <></>
    );
};

export default SignUp;