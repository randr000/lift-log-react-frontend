import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContext from './contexts/AppContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';

const AppRoutes = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {signedIn, user} = app_state;

    useEffect(() => {
        console.log(user.uid);
    }, [user]);

    return (
        <Routes>
            <Route path="/" element={user ? <Home/> : <Landing/>} />
            <Route path="/about" element={<About/>} />
        </Routes>
    );
};

export default AppRoutes;