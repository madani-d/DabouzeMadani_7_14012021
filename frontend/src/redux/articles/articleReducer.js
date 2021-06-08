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
            likeArticles[action.payload].liked = true;
            likeArticles[action.payload].articleLikes++;

            return {
                articles: likeArticles
            }

        case 'UNLIKEARTICLE':
            console.log(state.articles);
            const unlikeArticles = [...state.articles];
            unlikeArticles[action.payload].liked = false;
            unlikeArticles[action.payload].articleLikes--;
    
            return {
                articles: unlikeArticles
            }

        case 'LIKECOMMENT':
            console.log('like');
            const likeComment = [...state.articles];
            likeComment[action.articleId].comments[action.payload].liked = true;
            likeComment[action.articleId].comments[action.payload].commentLikes++;
            return {
                articles: likeComment
            }

        case 'UNLIKECOMMENT':
            console.log('unlike');
            const unlikeComment = [...state.articles];
            unlikeComment[action.articleId].comments[action.payload].liked = false;
            unlikeComment[action.articleId].comments[action.payload].commentLikes--;
            console.log(unlikeComment[action.payload]);

            return {
                articles: unlikeComment
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


export const likeArticle = (articleId, index) => dispatch => {
    console.log(articleId);
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
};

export const unlikeArticle = (articleId, index) => dispatch =>{
    axios.post(`${process.env.REACT_APP_API_URL}/api/article/unlikeArticle`,
        {articleId},
        { headers: {
            "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        }}
    )
    .then(res => {
        console.log(res);
        dispatch({
            type: 'UNLIKEARTICLE',
            payload: index
        })
    })
}

export const likeComment = (commentId, index, articleId) => dispatch => {
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
};

export const unlikeComment = (commentId, index, articleId) => dispatch =>{
    axios.post(`${process.env.REACT_APP_API_URL}/api/article/unlikeComment`,
        {commentId},
        { headers: {
            "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        }}
    )
    .then(res => {
        console.log(res);
        dispatch({
            type: 'UNLIKECOMMENT',
            payload: index,
            articleId: articleId
        });
    })
}





