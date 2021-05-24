import axios from 'axios';
import React, { useState } from 'react';
import logo from '../assets/icon-above-font.png'

function Login({ setUserId, setToken, setIsLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/auth/login',
            { email, password })       // Post with each form element value

            .then(res => {        
                console.log(res.data);     // After succes Post clear all form element state 
            setUserId(res.data.userId);// And add userId and token to state and localstorage
            setEmail("");
            setPassword("");
            setToken(res.data.token);
            const storageToken = {
                "userId": res.data.userId,
                "token": res.data.token
            }
            localStorage.setItem("storageToken", JSON.stringify(storageToken));
            })
    };

    const handleClick = () => {
        setIsLogin(false);
    }

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
        <button onClick={handleClick}>Créer un compte</button>
        </div>
    )
};

export default Login;