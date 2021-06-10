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
            const article = likeArticles[action.payload];
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
            const comment = likeComment[action.articleId].comments[action.payload];
            comment.liked = !comment.liked;
            comment.liked ?
                comment.commentLikes++
            :
                comment.commentLikes--;

            return {
                articles: likeComment
            }

        default:
            return {
                articles: state.articles
            }
    }
}

export default articleReducer;

export const getArticles = () => dispatch => {
    axios(`${process.env.REACT_APP_API_URL}/api/getall`,
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
    axios.post(`${process.env.REACT_APP_API_URL}/api/article`,
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
        axios.post(`${process.env.REACT_APP_API_URL}/api/article/unlikeArticle`,
            {articleId},
            { headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
            }}
        )
        .then(res => {
            console.log(res);
            dispatch({
                type: 'LIKEARTICLE',
                payload: index
                })
            })
    } else {
        axios.post(`${process.env.REACT_APP_API_URL}/api/article/likeArticle`,
            {articleId},
            { headers: {
                    "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
            }}
        )
        .then(res => {
            console.log(res);
            dispatch({
                type: 'LIKEARTICLE',
                payload: index
                })
            })
    }
};

export const likeComment = (commentId, index, articleId, likeValue) => dispatch => {
    if (likeValue) {
        axios.post(`${process.env.REACT_APP_API_URL}/api/article/likeComment`,
            {commentId},
            { headers: {
                    "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
            }}
        )
        .then(res => {
            console.log(res);
            dispatch({
                type: 'LIKECOMMENT',
                payload: index,
                articleId: articleId
            });
        })
    } else {
        axios.post(`${process.env.REACT_APP_API_URL}/api/article/unlikeComment`,
            {commentId},
            { headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
            }}
        )
        .then(res => {
            console.log(res);
            dispatch({
                type: 'LIKECOMMENT',
                payload: index,
                articleId: articleId
            });
        })
    }
};





