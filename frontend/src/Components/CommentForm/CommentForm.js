import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../redux/articles/articleReducer';

export default function CommentForm(props) {

    const [comm, setComm] = useState("");
    const dispatch = useDispatch();


    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userId", JSON.parse(localStorage.storageToken).userId);
        formData.append("articleId", props.articleId);
        formData.append("comment", comm);

        axios.post("http://localhost:5000/api/comment",
            formData,
            { headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
            }}
            )
            .then(res => {
                console.log(res);
                setComm("");
                dispatch(getArticles());
            })

    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="comment-form">Ajouter un commentaire</label>
                <input
                value={comm}
                onChange={(e) => setComm(e.target.value)}
                type="text"
                id="comment-form" />
                <button>Envoyer</button>
            </form>
        </div>
    )
}
