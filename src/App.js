import React, { useReducer, useState } from 'react';
import AppContext from './contexts/AppContext';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import { appReducer, APP_INITIAL_STATE } from './reducers/appReducer';

function App() {

  // const [showSignIn, setShowSignIn] = useState(false);
  // const [signInError, setSignInError] = useState(false);

  // const globalState = {
  //   showSignIn,
  //   setShowSignIn,
  //   // signInError,
  //   // setShowSignInError
  // };

  const [app_state, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);

  return (
    <div className="App">
      <AppContext.Provider value={{app_state: app_state, dispatch: dispatch}}>
        <Navbar />
        <SignIn />
      </AppContext.Provider>
    </div>
  );
}

export default App;