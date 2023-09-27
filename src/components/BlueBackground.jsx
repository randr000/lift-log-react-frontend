import React, { Children } from "react";

const BlueBackground = ({children}) => {
    return (
        <div className="blue-background" style={{height: "93vh", width: "100vw", zIndex: -1, position: "fixed", overflow: "auto"}}>
            {children}
        </div>
    );
};

export default BlueBackground;