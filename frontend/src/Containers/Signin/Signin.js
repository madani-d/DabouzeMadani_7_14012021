import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/without-icon.svg';
import icon from '../../assets/icon.svg';

function Signin({  setUserId, setToken, setIsLogin }) {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleBlur = e => {
        console.log(e);
        if(e.value === "") {
            console.log('vide');
            e.placeholder = "Champ obligatoire";
            e.required = true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    
        console.log(password);
        // axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signin`,
        //     { nom, prenom, email, password })// Post with each form element value

        //     .then(res => {                   // After succes Post clear all form element state 
        //         setNom("");
        //         setPrenom("");
        //         setEmail("");
        //         setPassword("");
        //         const storageToken = {
        //             "userId": res.data.userId,
        //             "token": res.data.token
        //         }
        //         localStorage.setItem("storageToken", JSON.stringify(storageToken));
        //         history.push('/home');
        //     })
    };


    return (
        <div className="connection-container">
                <div className="icon-container">
                    <img src={icon} alt="logo groupomania" className="icon" />
                </div>
                <img src={logo} alt="logo groupomania"/>
                <form className="login_form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <span className="input-icon">
                            <FontAwesomeIcon icon={faUser}/>
                        </span>
                        <input
                            type="text"
                            id="prenom"
                            aria-label="prenom"
                            placeholder="Prenom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)} 
                            onBlur={(e) => handleBlur(e.target)}
                            />
                    </div>

                    <div className="input-container">
                        <span className="input-icon">
                            <FontAwesomeIcon icon={faUser}/>
                        </span>
                        <input
                            type="text"
                            id="nom"
                            aria-label="nom"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            />
                    </div>

                    <div className="input-container">
                    <span className="input-icon">
                        <FontAwesomeIcon icon={faAt}/>
                    </span>
                    <input
                        type="email"
                        id="email"
                        aria-label="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => handleBlur(e.target)}
                        />
                    </div>

                <div className="input-container">
                    <span className="input-icon">
                        <FontAwesomeIcon icon={faLock}/>
                    </span>
                    <input
                        type="password"
                        id="password"
                        aria-label="mot de passe"
                        placeholder="Mot de passe*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) => handleBlur(e.target)}
                        />
                    <p className="info-password">*Min 8 caractères dont 1 minuscule, 1 majuscule, 1 chiffre</p>
                </div>

                    <button >S'inscrire</button>
                </form>
                <p>Ou</p>
                <button onClick={() => history.push('/login')}>Se connecter</button>
            </div>
    )
}

export default Signin;