import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Formulaire from './formulaire';

function Newsthread({ userId, token, setToken, setUserId }) {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        axios('http://localhost:5000/api/getall')
            .then(res => {
                console.log(res.data.result);
                setData(res.data.result)
            })
    }, [refresh])

    const handleDeconnection = () => {
        setToken("");
        setUserId("");
        localStorage.removeItem("storageToken");
        setRefresh(!refresh);
    }

    return (
        <div className="test-block">
            <Formulaire
                userId={userId}
                token={token}
                setToken={setToken}
                setUserId={setUserId}
                refresh={refresh}
                setRefresh={setRefresh}
            />
            {data.map(item => (
                <div
                    key={item.id}
                    className="test-item">
                    <h2>
                        <img
                            className="avatar"
                            src={item.avatar}
                            alt={item.nom}
                        />
                        {item.nom} {item.prenom}
                    </h2>
                    <figure
                        >
                    <img
                        className="postPicture"
                        src={item.image_url}
                        alt={item.texte_article}/>
                    <figcaption className="caption">
                        <h3>{item.texte_article}</h3>
                        like : {item.likepost}
                    </figcaption>
                    </figure>
                </div>
                
            ))}
            <button onClick={handleDeconnection}>Déconnexion</button>
        </div>

    )
}

export default Newsthread;