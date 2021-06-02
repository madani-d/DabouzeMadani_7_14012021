import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Comment from '../Comment/Comment';
import axios from 'axios';




export default function CardArticle(props) {



    const handleClickLike = (articleId) => {
        const likeData = {
            articleId: articleId,
            userId: JSON.parse(localStorage.storageToken).userId
        }
        axios.post('http://localhost:5000/api/article/like',
            likeData,
            {
                headers: {
                    "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
                }
            })
            .then(res => {
                console.log(res);
            })
    }

    console.log(props.comments);

    return (
        <div
            className="test-item">
            <h2>
                <img
                    className="avatar"
                    src={props.articleData.avatar}
                    alt={props.articleData.nom}
                />
                {props.articleData.nom} {props.articleData.prenom}
            </h2>
            <figure>
                <img
                    className="postPicture"
                    src={props.articleData.image_url}
                    alt={props.articleData.texte_article}/>
                <figcaption className="caption">
                    <h3>{props.articleData.texte_article}</h3>
                    like : {props.articleData.likepost}
                    {props.articleData.liked ?
                        <div>👍</div>
                        :
                        <button onClick={() => handleClickLike(props.articleData.id)}>J'aime</button>
                    }
                </figcaption>
            </figure>
            {props.articleData.comments.map(item => (
                <Comment commentData={item} key={uuidv4()} />
            ))}
        </div>
    )
}

