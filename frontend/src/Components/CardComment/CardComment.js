import { faHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { likeComment } from '../../redux/articles/articleReducer';
import OptionsToggle from '../OptionsToggle/OptionsToggle';
import React, { useState } from 'react';
import { deleteComment } from '../../redux/articles/articleReducer';
import './CardComment.scss';

export default function Comment(props) {
    const [option, setOption] = useState(false);
    const [modify, setModify] = useState(false);

    const comment = props.commentData;

    const dispatch = useDispatch();

    const handleLike = (commentId, index, articleId, likeValue) => {
        dispatch(likeComment(commentId, index, articleId, likeValue));
    }

    // const handleReport = articleId => {
    //     dispatch(reportComment(articleId))
    //     setOption(false);
    // }

    const handleDelete = (commentId, articleId) => {
        setOption(false);
        dispatch(deleteComment(commentId, articleId))
    }

    return (
        <article className="article-card light-container">
            <div className="card-header-comment">
                <h3>
                    <img
                        className="comment-avatar light-container"
                        src={comment.avatar}
                        alt={comment.nom}
                    />
                    {comment.nom} {comment.prenom}
                </h3>
                <button
                    onClick={() => setOption(!option)}
                    className="option-toggle light-button">
                    <FontAwesomeIcon icon={faEllipsisH}/>
                </button>
            </div>
            {option && 
            <OptionsToggle
                // handleReport={handleReport}
                handleDelete={handleDelete}
                setModify={setModify}
                modify={modify}
                itemId={comment.id}
                articleId={props.articleId}
                updateItem={comment.updateComment}
            />
            }
            {comment.updateComment && <span>Modifier</span> }
            <div className="comment-content">
                <p className="comment">{comment.texte_commentaire}</p>
                <button
                    className="like-button light-button"
                    onClick={() => handleLike(comment.id, props.index, props.articleId, comment.liked)}
                >
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={comment.liked ?
                            "like-icon liked"
                        :
                            "like-icon unliked"
                        }
                    />
                    {comment.commentLikes}
                </button>
            </div>
        </article>
    )
}
