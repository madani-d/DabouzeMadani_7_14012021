import axios from 'axios';

const INITIAL_ARTICLE_STATE = {
    articles: []
}

function articleReducer(state = INITIAL_ARTICLE_STATE, action) {
    switch(action.type) {
        case 'LOADARTICLES':
            console.log(action.payload);
            return {
                articles: action.payload
            }

        case 'LIKEARTICLE':
            console.log(state.articles);
            const likeArticles = [...state.articles];
            const article = likeArticles[action.index];
            article.liked = !article.liked;
            article.liked ? 
                article.articleLikes++
            :
            article.articleLikes--;

            return {
                articles: likeArticles
            }

        case 'LIKECOMMENT':
            console.log('like');
            const likeComment = [...state.articles];
            const comment = likeComment[action.articleId].comments[action.index];
            comment.liked = !comment.liked;
            comment.liked ?
                comment.commentLikes++
            :
                comment.commentLikes--;

            return {
                articles: likeComment
            }

        case 'UPDATEARTICLE':
            const updateArticle = [...state.articles];
            updateArticle[action.index].texte_article = action.articleTexte;

            return {
                articles: updateArticle
            }

        // case 'UPDATECOMMENT':
        //     const

        case 'DELETEARTICLE':
            const deleteArticle = state.articles.filter(item => item.id !== action.articleId)

            return {
                articles: deleteArticle
            }

        case 'DELETECOMMENT':
            const deleteComment = [...state.articles];
            console.log(action.articleId);
            for (const article of deleteComment) {
                console.log("ca passe la?");
                if (article.id === action.articleId) {
                    console.log(article.id);
                    article.comments = article.comments.filter(item => item.id !== action.commentId)
                    console.log(article.comments);
                    break
                }
            }
            console.log("c'est ici !!!!!");
            console.log(deleteComment);

            return {
                articles: deleteComment
            }

        default:
            return {
                articles: state.articles
            }
    }
}

export default articleReducer;

export const getArticles = () => dispatch => {
    axios(`${process.env.REACT_APP_API_URL}/api/article/getall`,
        { headers : {
        "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        }}
    )
    .then(res => {
        console.log(res);
        console.log(res.data.article);
        dispatch({
            type: 'LOADARTICLES',
            payload: res.data.article
        })
    })

    .catch(err => console.log(err.response.data.error.message))
}

export const postArticle = (data, fileType) => dispatch =>{
    axios.post(`${process.env.REACT_APP_API_URL}/api/article/article`,
        data,
        { headers: {
            "Content-Type": `${fileType}`,
            "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
    }})

        .then(res => {
            console.log(res);
            dispatch(getArticles())
        })
}


export const likeArticle = (articleId, index, likeValue) => dispatch => {
    console.log(articleId);
    if (likeValue) {
        axios.post(`${process.env.REACT_APP_API_URL}/api/unlikeArticle`,
            {articleId},
            { headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
            }}
        )
        .then(res => {
            console.log(res);
            dispatch({
                type: 'LIKEARTICLE',
                index: index
                })
            })
    } else {
        axios.post(`${process.env.REACT_APP_API_URL}/api/likeArticle`,
            {articleId},
            { headers: {
                    "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
            }}
        )
        .then(res => {
            console.log(res);
            dispatch({
                type: 'LIKEARTICLE',
                index: index
                })
            })
    }
};

export const likeComment = (commentId, index, articleId, likeValue) => dispatch => {
    if (likeValue) {
        axios.post(`${process.env.REACT_APP_API_URL}/api/likeComment`,
            {commentId},
            { headers: {
                    "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
            }}
        )
        .then(res => {
            console.log(res);
            dispatch({
                type: 'LIKECOMMENT',
                index: index,
                articleId: articleId
            });
        })
    } else {
        axios.post(`${process.env.REACT_APP_API_URL}/api/unlikeComment`,
            {commentId},
            { headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
            }}
        )
        .then(res => {
            console.log(res);
            dispatch({
                type: 'LIKECOMMENT',
                index: index,
                articleId: articleId
            });
        })
    }
};

export const deleteArticle = articleId  => dispatch => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/article/delete`,{
        headers: {
            "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        },
        data: { articleId }
    })
    .then(res => {
        console.log(res);
        dispatch({
            type: 'DELETEARTICLE',
            articleId: articleId
        })
    })
    .catch(error => console.log(error))
}

export const deleteComment = (commentId, articleId) => dispatch => {
    // axios.delete(`${process.env.REACT_APP_API_URL}/api/comment/delete`,{
    //     headers: {
    //         "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
    //     },
    //     data: { commentId }
    // })
    // .then(res => {
    //     console.log(res);
    //     dispatch({
    //         type: 'DELETECOMMENT',
    //         commentId: commentId,
    //         articleId: articleId,
    //         index: index
    //     })
    // })
    dispatch({
        type: 'DELETECOMMENT',
        commentId: commentId,
        articleId: articleId
    })
}

export const updateArticle = (article, articleId, index) => dispatch => {
    const data = { article: article, articleId: articleId }
    console.log(data);
    axios.put(`${process.env.REACT_APP_API_URL}/api/article/update`, 
        data,
        { headers: {
            "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        }}
    )
    .then(res => {
        dispatch({
            type: 'UPDATEARTICLE',
            index: index,
            articleTexte: article
        })
    })
}

export const reportArticle = articleId => dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/article/report`,
        {articleId},
        {headers: {
            "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        }}
    )
    .then(res => console.log(res))
}





