import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm'
import { postLike } from '../../redux/articles/articleReducer';
import { useDispatch } from 'react-redux';




export default function CardArticle(props) {

    const dispatch = useDispatch();


    const handleClickLike = (articleId) => {
        dispatch(postLike(articleId))
    }


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
            {props.articleData.updateArticle && <span>Modifier</span> }
            {props.articleData.comments.map(item => (
                <Comment commentData={item} key={uuidv4()} />
            ))}
            <CommentForm articleId={props.articleData.id}/>
        </div>
    )
}

