import React from 'react';
import { useDispatch } from 'react-redux';
import { likeComment, unlikeComment } from '../../redux/articles/articleReducer';

export default function Comment(props) {

    const dispatch = useDispatch();

    const handleLike = (commentId, index, articleId) => {
        dispatch(likeComment(commentId, index, articleId));
    }

    const handleUnlike = (commentId, index, articleId) => {
        dispatch(unlikeComment(commentId, index, articleId));
    }

    return (
        <div>
                <div
                    className="test-com">
                    <h2>
                        <img
                            className="avatar"
                            src={props.commentData.avatar}
                            alt={props.commentData.nom}
                        />
                        {props.commentData.nom} {props.commentData.prenom}
                    </h2>
                    <figure>
                        <img
                            className="comPicture"
                            src={props.commentData.image_url}
                            alt={props.commentData.texte_commentaire}/>
                        <figcaption className="test-com">
                            <h3>{props.commentData.texte_commentaire}</h3>
                        </figcaption>
                    </figure>
                    {props.commentData.updateComment && <span>Modifier</span> }
                    like : {props.commentData.commentLikes}
                    {props.commentData.liked ?
                        <button onClick={() => handleUnlike(props.commentData.id, props.index, props.articleId)}>👍</button>
                    :
                        <button onClick={() => handleLike(props.commentData.id, props.index, props.articleId)}>J'aime</button>
                    }
                </div>
            
        </div>
    )
}
