import React from 'react';
import Image from 'react-bootstrap/Image';
import backgroundImg from '../img/liftlog-logos.jpeg';

const BackgroundLogo = () => {
    return (
        <Image src={`${backgroundImg}`} style={{height: "100vh", width: "100vw", zIndex: -1, position: 'fixed'}} />
    );
};

export default BackgroundLogo;