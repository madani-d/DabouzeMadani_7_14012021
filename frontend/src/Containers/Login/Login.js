import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../assets/without-icon.svg';
import icon from '../../assets/icon.svg';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
require('dotenv').config();

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,
            { email, password })       // Post with each form element value

            .then(res => {        
                console.log(res);     // After succes Post clear all form element state 
                setEmail("");
                setPassword("");
                const storageToken = { // And add userId and token to localstorage
                    "userId": res.data.userId,
                    "token": res.data.token
                }
                localStorage.setItem("storageToken", JSON.stringify(storageToken));
                dispatch({
                    type: 'CONNECT'
                })
                history.push('/home');
            })
    };


    return (
        <div className="connection-container">
            <div className="icon-container">
                <img src={icon} alt='logo groupomania' className="icon"/>
            </div>
            <img src={logo} alt='logo groupomania' className="login-logo"/>
                <form className="login_form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <span className="input-icon">
                        
                        <FontAwesomeIcon icon={faAt}/>
                    </span>
                    <input
                        type="text"
                        id="email1"
                        aria-label="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-container">
                    <span className="input-icon">
                        <FontAwesomeIcon icon={faLock}/>
                    </span>
                    <input
                        type="text"
                        id="password1"
                        aria-label="mot de passe"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                    <button>Connexion</button>
                </form>
                <p>Ou</p>
            <button onClick={() => history.push('/signin')}>Créer un compte</button>
        </div>
    )
};

export default Login;