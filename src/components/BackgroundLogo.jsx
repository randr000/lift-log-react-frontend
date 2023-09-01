import React from 'react';
import Image from 'react-bootstrap/Image';
import backgroundImg from '../img/liftlog-logos.jpeg';

const BackgroundLogo = () => {
    return (
        <div className="text-center">
            <Image src={`${backgroundImg}`} className="text-center" alt="Background Image Logo" style={{height: "100vh"}} />
        </div>
    );
};

export default BackgroundLogo;