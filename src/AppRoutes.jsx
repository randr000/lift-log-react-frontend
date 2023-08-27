import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/about" element={<About/>} />
        </Routes>
    );
};

export default AppRoutes;