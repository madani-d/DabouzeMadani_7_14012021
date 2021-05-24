import axios from 'axios';
import React, { useState } from 'react';
import logo from '../assets/icon-above-font.png'

function Signin({  setUserId, setToken, setIsLogin }) {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log(password);
        axios.post('http://localhost:5000/api/auth/signin',
            { nom, prenom, email, password })// Post with each form element value

            .then(res => {                   // After succes Post clear all form element state 
                setUserId(res.data.userId);  // And add userId and token to state and localstorage
                setNom("");
                setPrenom("");
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
        setIsLogin(true)
    }

    return (
        <div className="login">
        <img src={logo} alt="logo groupomania"/>
            <h1>
                Inscrivez vous !
            </h1>
            <form className="login_form" onSubmit={handleSubmit}>
                <label htmlFor="prenom">Prenom</label>
                <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)} />

                <label htmlFor="nom">Nom</label>
                <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}/>
                
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Mot de passe</label>
                <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                <button >S'inscrire</button>
            </form>
            <button onClick={handleClick}>Se connecter</button>
        </div>
    )
}

export default Signin;