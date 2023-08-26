import React, { useReducer, useState } from 'react';
import AppContext from './contexts/AppContext';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import { appReducer, APP_INITIAL_STATE } from './reducers/appReducer';
import backgroundImg from './img/liftlog-logos.jpeg';

function App() {

  const [app_state, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);

  return (
    <div className="App">
      <AppContext.Provider value={{app_state: app_state, dispatch: dispatch}} className="overflow-hidden">
        <Navbar />
        <SignIn />
        {/* <div classname="container-fluid" style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          maxWidth: "100vw",
          minHeight: "100vh",
          overflowY: "hidden",
          top: 0,
          bottom: 0,
        }}>
        </div> */}
        <img className="img-fluid" src={`${backgroundImg}`} style={{height: "100vh", width: "100vw", zIndex: -1, position: 'fixed'}}></img>
      </AppContext.Provider>
    </div>
  );
}

export default App;