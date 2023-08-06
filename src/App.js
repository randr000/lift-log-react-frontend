import React, { useState } from 'react';
import MyContext from './MyContext';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';

function App() {

  const [showSignIn, setShowSignIn] = useState(false);

  const globalState = {
    showSignIn,
    setShowSignIn
  };

  return (
    <div className="App">
      <MyContext.Provider value={globalState}>
        <Navbar setShowSignIn={setShowSignIn} />
        <SignIn showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      </MyContext.Provider>
    </div>
  );
}

export default App;
