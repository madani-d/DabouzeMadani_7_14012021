import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../assets/icon-above-font.png'
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
        <div className="login">
        <img src={logo} alt='logo groupomania'/>
            <form className="login_form" onSubmit={handleSubmit}>
                <h1>Deja inscrit</h1>
                <label htmlFor="email1">Email</label>
                <input
                    type="text"
                    id="email1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password1">Mot de passe</label>
                <input
                    type="text"
                    id="password1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button>Connexion</button>
            </form>
        <button onClick={() => history.push('/signin')}>Créer un compte</button>
        </div>
    )
};

export default Login;