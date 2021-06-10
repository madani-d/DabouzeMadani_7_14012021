import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Comment from '../CardComment/CardComment';
import CommentForm from '../CommentForm/CommentForm'
import { likeArticle } from '../../redux/articles/articleReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './CardArticle.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faHeart } from '@fortawesome/free-solid-svg-icons';


export default function CardArticle(props) {
    const articles = props.articleData;
    const [showMore, setShowMore] = useState(false);
    const dispatch = useDispatch();

    const handleLike = (articleId, index, likeValue) => {
        console.log(likeValue);
        dispatch(likeArticle(articleId, index, likeValue))
    }

    return (
        <article
            className="article-card">
            <div className="card-header">

            <h2>
                <Link to={{
                    pathname: `/profile/${articles.prenom}-${articles.nom}`,
                    state: {
                        userId: articles.user_id
                    }
                }}>
                    <img
                        className="avatar"
                        src={articles.avatar}
                        alt={articles.nom}
                    />
                </Link>
                {articles.nom} {articles.prenom}
            </h2>
            </div>
            <figure>
                    <h3 className="article-card-title">{articles.texte_article}</h3>
                <img
                    className="article-card-picture"
                    src={articles.image_url}
                    alt={articles.texte_article}/>
                <figcaption className="article-card-footer">
                    <span className="like-container">
                        <button
                            className="like-button"
                            onClick={() => handleLike(articles.id, props.index, articles.liked)}
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={articles.liked ?
                                    "like-icon liked"
                                :
                                    "like-icon unliked"
                                }
                            />
                            {articles.articleLikes}
                        </button>
                    </span>
                    <button onClick={() => setShowMore(!showMore)}>{articles.comments.length} Commentaires</button>
                </figcaption>
            </figure>
            {articles.updateArticle && 
                <button className="option-article">
                    <FontAwesomeIcon icon={faEllipsisH}/>
                </button>
            }
            {showMore &&
                articles.comments.map((item, index) => (
                    <Comment commentData={item} index={index} articleId={props.index} key={uuidv4()} />
                ))
            }
            <CommentForm articleId={articles.id}/>
        </article>
    )
}

