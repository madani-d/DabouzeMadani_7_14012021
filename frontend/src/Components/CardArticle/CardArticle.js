import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm'
import { likeArticle, unlikeArticle } from '../../redux/likeReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export default function CardArticle(props) {

    const dispatch = useDispatch();

    const handleLike = (articleId) => {
        dispatch(likeArticle(articleId))
    }

    const handleUnlike = (articleId) => {
        dispatch(unlikeArticle(articleId))
    }

    return (
        <div
            className="test-item">
            <h2>
                <Link to={{
                    pathname: `/profile/${props.articleData.prenom}-${props.articleData.nom}`,
                    state: {
                        userId: props.articleData.user_id
                    }
                }}>
                    <img
                        className="avatar"
                        src={props.articleData.avatar}
                        alt={props.articleData.nom}
                    />
                </Link>
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
                        <button onClick={() => handleUnlike(props.articleData.id)}>👍</button>
                        :
                        <button onClick={() => handleLike(props.articleData.id)}>J'aime</button>
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

