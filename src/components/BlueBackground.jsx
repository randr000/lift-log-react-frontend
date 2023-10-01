import React from "react";

const BlueBackground = ({children}) => {
    return (
        <div className="blue-background" style={{height: "91vh", width: "100vw", zIndex: -1, position: "fixed", overflow: "auto"}}>
            {children}
        </div>
    );
};

export default BlueBackground;