import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { likeComment } from '../../redux/articles/articleReducer';
import './CardComment.scss';

export default function Comment(props) {
    const comments = props.commentData;

    const dispatch = useDispatch();

    const handleLike = (commentId, index, articleId,likeValue) => {
        dispatch(likeComment(commentId, index, articleId, likeValue));
    }

    return (
        <article>
            <h2>
                <img
                    className="avatar"
                    src={comments.avatar}
                    alt={comments.nom}
                />
                {comments.nom} {comments.prenom}
            </h2>
            <figure>
                <img
                    className="comPicture"
                    src={comments.image_url}
                    alt={comments.texte_commentaire}/>
                <figcaption className="test-com">
                    <h3>{comments.texte_commentaire}</h3>
                </figcaption>
            </figure>
            {comments.updateComment && <span>Modifier</span> }
            <button
                className="like-button"
                onClick={() => handleLike(comments.id, props.index, props.articleId, comments.liked)}
            >
                <FontAwesomeIcon
                    icon={faHeart}
                    className={comments.liked ?
                        "like-icon liked"
                    :
                        "liked-icon unliked"
                    }
                />
                {comments.commentLikes}
            </button>
            {/* {comments.liked ?
                <button onClick={() => handleUnlike(comments.id, props.index, props.articleId)}>👍</button>
            :
                <button onClick={() => handleLike(comments.id, props.index, props.articleId)}>J'aime</button>
            } */}
        </article>
    )
}
