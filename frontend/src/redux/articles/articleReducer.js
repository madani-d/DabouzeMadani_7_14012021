import axios from 'axios';

const INITIAL_ARTICLE_STATE = {
    articles: []
}

function articleReducer(state = INITIAL_ARTICLE_STATE, action) {

    switch(action.type) {
        case 'LOADARTICLES':
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
        console.log(res.data);
        console.log(res.data.article);
        dispatch({
            type: 'LOADARTICLES',
            payload: res.data.article
        })
    })
}