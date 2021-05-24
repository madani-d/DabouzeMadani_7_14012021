import Login from './Login';
import Signin from './Signin'
import React, { useState } from 'react';


function Connection({ setUserId, setToken }) {
    const [isLogin, setIsLogin] = useState(true);


    return (
        <div className="connection">
            {isLogin// Display Login page or Signin page
                ? <Login setIsLogin={setIsLogin} setUserId={setUserId} setToken={setToken} />
                : <Signin setIsLogin={setIsLogin} setUserId={setUserId} setToken={setToken} />
            }
        </div>
    )
}

export default Connection;