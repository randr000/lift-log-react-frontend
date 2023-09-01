import React from 'react';
import BlueBackground from '../components/BlueBackground';
import SignIn from '../components/SignIn';

const About = () => {
    return (
        <BlueBackground>
            <h1 className="google-font-800 text-white text-center mt-5 fs-1">About liftlog</h1>
            <p className="google-font-300 text-white text-center text-wrap mt-2 fs-3">
                liftlog is a website where users can keep track of their weight lifting and fitness goals
                </p>
        </BlueBackground>
    );
};

export default About;