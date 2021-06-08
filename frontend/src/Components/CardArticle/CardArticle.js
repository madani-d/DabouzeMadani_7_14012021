import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm'
import { likeArticle, unlikeArticle } from '../../redux/articles/articleReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export default function CardArticle(props) {

    const dispatch = useDispatch();

    const handleLike = (articleId, index) => {
        dispatch(likeArticle(articleId, index))
    }

    const handleUnlike = (articleId, index) => {
        dispatch(unlikeArticle(articleId, index))
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
                    like : {props.articleData.articleLikes}
                    {props.articleData.liked ?
                        <button onClick={() => handleUnlike(props.articleData.id, props.index)}>👍</button>
                        :
                        <button onClick={() => handleLike(props.articleData.id, props.index)}>J'aime</button>
                    }
                </figcaption>
            </figure>
            {props.articleData.updateArticle && <span>Modifier</span> }
            {props.articleData.comments.map((item, index) => (
                <Comment commentData={item} index={index} articleId={props.index} key={uuidv4()} />
            ))}
            <CommentForm articleId={props.articleData.id}/>
        </div>
    )
}

