import React, { useReducer, useEffect } from 'react';
import AppContext from './contexts/AppContext';
import SiteNavbar from './components/SiteNavbar';
import { appReducer, APP_INITIAL_STATE } from './reducers/appReducer';
import AppRoutes from './AppRoutes';

function App() {

  const [appState, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);
  const {user} = appState;

  // Save user information to local storage so user stays logged in after page refreshes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <div className="App">
      <AppContext.Provider value={{appState: appState, dispatch: dispatch}} className="overflow-hidden">
        <SiteNavbar />
        <AppRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;