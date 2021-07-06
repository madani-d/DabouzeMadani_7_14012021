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

        case 'POSTARTICLE':
            const postArticle = [...state.articles];
            postArticle.unshift(action.payload);

            return {
                articles: postArticle
            }

        case 'POSTCOMMENT':
            const postComment = [...state.articles];
            const index = postComment.findIndex(element => element.id === action.articleId);
            postComment[index].comments.push(action.payload)

            return {
                articles: postComment
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
            const articleIndex = likeComment.findIndex(element => element.id === action.articleId);
            likeComment[articleIndex].comments[action.index].liked = !likeComment[articleIndex].comments[action.index].liked;
            likeComment[articleIndex].comments[action.index].liked ?
                likeComment[articleIndex].comments[action.index].commentLikes++
            :
                likeComment[articleIndex].comments[action.index].commentLikes--;

            return {
                articles: likeComment
            }

        case 'UPDATEARTICLE':
            const updateArticles = [...state.articles];
            const updateIndex = updateArticles.findIndex(element => element.id === action.articleId);
            updateArticles[updateIndex].image_url = action.payload.image_url;
            updateArticles[updateIndex].texte_article = action.payload.article;
            return {
                articles: updateArticles
            }

        case 'UPDATEARTICLETEXT':
            const updateArticlesText = [...state.articles];
            const updateTextIndex = updateArticlesText.findIndex(element => element.id === action.articleId);
            updateArticlesText[updateTextIndex].texte_article = action.payload;
            return {
                articles: updateArticlesText
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
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        }
    )
    .then(res => {
        console.log(res);
        console.log(res.data);
        dispatch({
            type: 'LOADARTICLES',
            payload: res.data
        })
    })

    .catch(err => console.log(err.response.data.error.message))
}

export const postArticle = (data, fileType) => dispatch =>{
    axios.post(`${process.env.REACT_APP_API_URL}/api/article/article`,
        data,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers: {
                "Content-Type": `${fileType}`,
                "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
            }
        }
    )

        .then(res => {
            dispatch({
                type: 'POSTARTICLE',
                payload: res.data
            })
        })
}

export const postComment = (articleId, comment) => dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/comment`,
        {articleId, comment},
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        }
    )
    .then(res => {
        console.log(res);
        console.log(res.data);
        dispatch({
            type: 'POSTCOMMENT',
            payload: res.data,
            articleId: articleId
        })
    })
}


export const likeArticle = (articleId, index, likeValue) => dispatch => {
    console.log(articleId);
    if (likeValue) {
        axios.post(`${process.env.REACT_APP_API_URL}/api/unlikeArticle`,
            {articleId},
            {
                params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
                headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
            }
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
            {
                params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
                headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
            }
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
    console.log(articleId);
    if (likeValue) {
        axios.post(`${process.env.REACT_APP_API_URL}/api/likeComment`,
            {commentId},
            {
                params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
                headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
            }
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
            {
                params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
                headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
            }
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
    axios.delete(`${process.env.REACT_APP_API_URL}/api/article/delete`,
    {
        params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
        headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token },
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
    axios.delete(`${process.env.REACT_APP_API_URL}/api/comment/delete`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token },
            data: { commentId }
        }
    )
    .then(res => {
        console.log(res);
        dispatch({
            type: 'DELETECOMMENT',
            commentId: commentId,
            articleId: articleId
        })
    })
}

export const updateArticle = (data, articleId, fileType) => dispatch => {
    if (fileType) {
        axios.put(`${process.env.REACT_APP_API_URL}/api/article/updateArticle`, 
            data,
            {
                params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
                headers: {
                    "Content-Type": `${fileType}`,
                    "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token
                }
            }
        )
        .then(res => {
            console.log(res.data);
            dispatch({
                type: 'UPDATEARTICLE',
                payload: res.data,
                articleId: articleId
            })
        })
    } else {
        axios.put(`${process.env.REACT_APP_API_URL}/api/article/updateText`, 
            data,
            {
                params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
                headers: { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token },
            }
        )
        .then(res => {
            console.log(res.data);
            dispatch({
                type: 'UPDATEARTICLETEXT',
                payload: res.data,
                articleId: articleId
            })
        })
    }
}

export const reportArticle = articleId => dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/article/report`,
        {articleId},
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        }
    )
    .then(res => {
        res.data.message === "déja signalé" && alert("Vous avez déja signalé cette article.");
    })
}

export const reportComment = commentId => dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/comment/report`,
        {commentId},
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        }
    )
    .then(res => {
        res.data.message === "déja signalé" && alert("vous avez déja signalé ce commentaire.")
    })
} 