import axios from 'axios';
import { getArticles } from './articles/articleReducer';

//Article like/unlike
export const likeArticle = (articleId) => dispatch => {
    console.log(articleId);
    axios.post('http://localhost:5000/api/article/likeArticle',
        {articleId},
        { headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        }}
    )
    .then(res => {
    console.log(res);
    dispatch(getArticles());
    })
};

export const unlikeArticle = (articleId) => dispatch =>{
    axios.post('http://localhost:5000/api/article/unlikeArticle',
        {articleId},
        { headers: {
            "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        }}
    )
    .then(res => {
        console.log(res);
        dispatch(getArticles());
    })
}

//Comment like/unlike
export const likeComment = (commentId) => dispatch => {
    axios.post('http://localhost:5000/api/article/likeComment',
        {commentId},
        { headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        }}
    )
    .then(res => {
    console.log(res);
    dispatch(getArticles());
    })
};

export const unlikeComment = (commentId) => dispatch =>{
    axios.post('http://localhost:5000/api/article/unlikeComment',
        {commentId},
        { headers: {
            "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        }}
    )
    .then(res => {
        console.log(res);
        dispatch(getArticles());
    })
}