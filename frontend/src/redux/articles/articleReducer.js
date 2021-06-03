import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

        case 'ADDARTICLE':
            return {

            }

        default:
            return {
                articles: state.articles
            }
    }
}

export default articleReducer;

export const getArticles = () => dispatch => {
    axios('http://localhost:5000/api/getall',
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
    axios.post('http://localhost:5000/api/article',
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

export const postLike = (articleId) => dispatch => {
    console.log(articleId);
    axios.post('http://localhost:5000/api/article/like',
        {articleId},
        { headers: {
                "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
    }})
    .then(res => {
    console.log(res);
    dispatch(getArticles());
})
}



