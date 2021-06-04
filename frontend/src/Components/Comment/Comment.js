import React from 'react';
import { useDispatch } from 'react-redux';
import { likeComment, unlikeComment } from '../../redux/likeReducer';

export default function Comment(props) {

    const dispatch = useDispatch();

    const handleLike = (commentId) => {
        dispatch(likeComment(commentId));
    }

    const handleUnlike = (commentId) => {
        dispatch(unlikeComment(commentId));
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
                    {props.commentData.commentLiked ?
                        <button onClick={() => handleUnlike(props.commentData.id)}>👍</button>
                    :
                        <button onClick={() => handleLike(props.commentData.id)}>J'aime</button>
                    }
                </div>
            
        </div>
    )
}
