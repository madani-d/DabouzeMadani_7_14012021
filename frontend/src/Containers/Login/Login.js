import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import logo from '../../assets/without-icon.svg';
import icon from '../../assets/icon.svg';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
require('dotenv').config();

function Login() {
    const { register, handleSubmit, formState, setError } = useForm();
    const { isDirty, isValid, errors } = formState;

    const dispatch = useDispatch();

    const history = useHistory();

    const onSubmit = async data => {
        console.log(data.email);

        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,
            { email: data.email,password: data.password })

            .then(res => {        
                console.log(res);
                const storageToken = {
                    "userId": res.data.userId,
                    "token": res.data.token
                }
                localStorage.setItem("storageToken", JSON.stringify(storageToken));
                dispatch({
                    type: 'CONNECT'
                })
                console.log(formState);

                // history.push('/home');
            })
            .catch(err => {
                setError("connect", {
                    message: "Email ou mot de passe incorrect"
                })
                alert("mot de passe incorect")
                console.log(formState);
            })
            // console.log(errors.connect.message);
    };


    return (
        <div className="connection-container light-container">
            <div className="icon-container">
                <img src={icon} alt='logo groupomania' className="icon light-icon"/>
            </div>
            <img src={logo} alt='logo groupomania' className="login-logo"/>
                <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container light-input">
                    <span className="input-icon light-input-icon">
                        
                        <FontAwesomeIcon icon={faAt}/>
                    </span>
                    <input
                        type="text"
                        id="email1"
                        aria-label="email"
                        placeholder="Email"
                        {...register('email', {required: true})}/>
                </div>

                <div className="input-container light-input">
                    <span className="input-icon light-input-icon">
                        <FontAwesomeIcon icon={faLock}/>
                    </span>
                    <input
                        type="password"
                        id="password1"
                        aria-label="mot de passe"
                        placeholder="Mot de passe"
                        {...register('password', {required:true})}/>
                </div>
                    <button className="light-button">Connexion</button>
                </form>
                <p>Ou</p>
            <button
                disabled={!isDirty || !isValid}
                className="light-button"
                onClick={() => history.push('/signin')}>
                Créer un compte
            </button>
        </div>
    )
};

export default Login;