import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getArticles } from '../../redux/articles/articleReducer';
import './CommentForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function CommentForm(props) {

    const [comm, setComm] = useState("");
    const dispatch = useDispatch();


    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userId", JSON.parse(localStorage.storageToken).userId);
        formData.append("articleId", props.articleId);
        formData.append("comment", comm);

        axios.post(`${process.env.REACT_APP_API_URL}/api/comment`,
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
        <>
            <form 
                onSubmit={(e) => handleSubmit(e)}
                className="comment-form"
            >
                <input
                value={comm}
                onChange={(e) => setComm(e.target.value)}
                type="text"
                aria-label="ajouter un commentaire"
                placeholder="Ajouter un commentaire"
                className="comment-form-input" />
                <button className="comment-form-button">
                    <FontAwesomeIcon 
                        icon={faPaperPlane}
                    />
                </button>
            </form>
        </>
    )
}
