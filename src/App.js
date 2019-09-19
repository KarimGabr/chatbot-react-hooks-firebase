import React, { useState } from 'react';
import { Router, Redirect } from "@reach/router";
import { firebase } from "./firebase";

import Nav from './components/Nav';
import Channel from './components/Channel';

import useAuth from "./custom-hooks/useAuth";

function App() {

  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="channel/:channelID" user={user} />
        <Redirect from="/" to="channel/general" />
      </Router>
    </div>
  ) : (
    <Login />
  )
}

function Login(){
  
  const [authError ,setAuthError] = useState(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error)
    }
  }

  return (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      { authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p><i>{ authError.message }</i></p>
          <p>Please try again</p> 
        </div>
      ) }
    </div>
  )
}

export default App;
