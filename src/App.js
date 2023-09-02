import React, { useReducer, useState,useEffect } from 'react';
import AppContext from './contexts/AppContext';
import SiteNavbar from './components/SiteNavbar';
// import SignIn from './components/SignIn';
import { appReducer, APP_INITIAL_STATE } from './reducers/appReducer';
import AppRoutes from './AppRoutes';
import { Navigate } from 'react-router-dom';
// import BackgroundLogo from './components/BackgroundLogo';


function App() {

  const [app_state, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);

  const RequireAuth = ({children}) => {
    return app_state.user ? children : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <AppContext.Provider value={{app_state: app_state, dispatch: dispatch}} className="overflow-hidden">
        <SiteNavbar />
        <AppRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;