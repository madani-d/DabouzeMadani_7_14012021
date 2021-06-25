import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Comment from '../CardComment/CardComment';
import CommentForm from '../CommentForm/CommentForm';
// import ArticleForm from '../ArticleForm/ArticleForm';
import ArticleUpdateForm from '../ArticleUpdateForm/ArticleUpdateForm';
import OptionsToggle from '../OptionsToggle/OptionsToggle';
import { deleteArticle, likeArticle, reportArticle } from '../../redux/articles/articleReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faHeart } from '@fortawesome/free-solid-svg-icons';
import './CardArticle.scss';


export default function CardArticle(props) {
    const articles = props.articleData;
    const [showMore, setShowMore] = useState();
    const [option, setOption] = useState(false);
    const [modify, setModify] = useState(false);
    const dispatch = useDispatch();
    
    const handleLike = (articleId, index, likeValue) => {
        console.log(likeValue);
        dispatch(likeArticle(articleId, index, likeValue))
    }

    const handleReport = articleId => {
        dispatch(reportArticle(articleId))
        setOption(false);
    }

    const handleDelete = articleId => {
        setOption(false);
        dispatch(deleteArticle(articleId))
    }
    // useEffect(() => {
    //     setShowMore(false);
    // }, [showMore])

    return (
        <article className="article-card light-container">
            <div className="card-header">

                <h2>
                    <Link to={{
                        pathname: `/profile/${articles.prenom}-${articles.nom}-${articles.user_id}`,
                        state: {
                            userId: articles.user_id
                        }
                    }}>
                        <img
                            className="avatar light-container"
                            src={articles.avatar}
                            alt={articles.nom}
                        />
                    </Link>
                    {articles.nom} {articles.prenom}
                </h2>
                <button
                    onClick={() => setOption(!option)}
                    className="option-toggle light-button">
                    <FontAwesomeIcon icon={faEllipsisH}/>
                </button>
            </div>
            {option && 
            <OptionsToggle
                handleReport={handleReport}
                handleDelete={handleDelete}
                setModify={setModify}
                modify={modify}
                itemId={articles.id}
                updateItem={articles.updateArticle}
            />
            }
            {modify ?
                <ArticleUpdateForm
                    imageUrl={articles.image_url}
                    texteArticle={articles.texte_article}
                    setModify={setModify}
                    modify={modify}
                    articleId={articles.id}
                    index={props.index}
                    />
            :
                <figure>
                        <h3 className="article-card-title">{articles.texte_article}</h3>
                    <img
                        className="article-card-picture light-container"
                        src={articles.image_url}
                        alt={articles.texte_article}/>
                    <figcaption className="article-card-footer">
                        <span className="like-container">
                            <button
                                className="like-button light-button"
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
                        <button
                            className="comment-button light-button"
                            onClick={() => setShowMore(!showMore)}
                        >
                            {articles.comments.length} Commentaires
                        </button>
                    </figcaption>
                </figure>
            }
            {showMore &&
                articles.comments.map((item, index) => (
                    <Comment commentData={item} index={index} articleId={articles.id} key={uuidv4()} />
                ))
            }
            <CommentForm articleId={articles.id}/>
        </article>
    )
}