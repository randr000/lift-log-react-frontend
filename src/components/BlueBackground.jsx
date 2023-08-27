import React, { Children } from "react";

const BlueBackground = ({children}) => {
    return (
        <div className="blue-background" style={{height: "100vh", width: "100vw", zIndex: -1, position: 'fixed'}}>
            {children}
        </div>
    );
};

export default BlueBackground;