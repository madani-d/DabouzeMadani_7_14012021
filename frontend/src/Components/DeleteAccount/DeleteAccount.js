import React from 'react';
import { useHistory } from 'react-router';
import './DeleteAccount.scss';
import axios from 'axios'

export default function DeleteAccount({ setOpenModal }) {
    const history = useHistory();

    const handleDeleteAccount = () => {
        console.log('test');
        axios(`${process.env.REACT_APP_API_URL}/api/auth/deleteAccount`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        }
    )
    .then(res => {
        console.log(res);
        history.push('/signin')
    })
    }
    return (
        <div className="modal">
            <div className="modal-content light-container">
                <h1>Voulez vous vraiment supprimer votre compte ?</h1>
                <div className="modal-button-box">
                    <button
                        onClick={() => handleDeleteAccount()}
                        className="modal-button light-button delete-account"
                    >
                        Oui
                    </button>
                    <button
                        onClick={() => setOpenModal(false)}
                        className="modal-button light-button cancel-delete"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    )
}
