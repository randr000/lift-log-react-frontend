import React, { useState } from 'react';
import AppContext from './AppContext';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';

function App() {

  const [showSignIn, setShowSignIn] = useState(false);
  // const [signInError, setSignInError] = useState(false);

  const globalState = {
    showSignIn,
    setShowSignIn,
    // signInError,
    // setShowSignInError
  };

  return (
    <div className="App">
      <AppContext.Provider value={globalState}>
        <Navbar />
        <SignIn />
      </AppContext.Provider>
    </div>
  );
}

export default App;
