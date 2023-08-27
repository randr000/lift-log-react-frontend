import React, { useReducer, useState } from 'react';
import AppContext from './contexts/AppContext';
import Navbar from './components/Navbar';
// import SignIn from './components/SignIn';
import { appReducer, APP_INITIAL_STATE } from './reducers/appReducer';
import AppRoutes from './AppRoutes';
// import BackgroundLogo from './components/BackgroundLogo';


function App() {

  const [app_state, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);

  return (
    <div className="App">
      <AppContext.Provider value={{app_state: app_state, dispatch: dispatch}} className="overflow-hidden">
        <Navbar />
        <AppRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;