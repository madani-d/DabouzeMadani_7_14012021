// import React from 'react';
import { useState  } from 'react';
import Newsthread from './Newsthread';
import Connection from './Connection';

function App() {// Create state and update state function for each form element 
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  return (
    !token ? <Connection setUserId={setUserId} setToken={setToken} />
      : (
      <div>
        <Newsthread userId={userId} token={token} setToken={setToken} setUserId={setUserId} />
      </div>
      )
  )
}


export default App;
