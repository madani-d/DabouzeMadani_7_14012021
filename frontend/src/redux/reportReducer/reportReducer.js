import axios from 'axios';

const INITIAL_REPORT_STATE = {
    reported: {}
}

function reportArticle(state = INITIAL_REPORT_STATE, action) {
    switch(action.type) {
        case 'LOADREPORTS':
            console.log('testetsetest');
            const reported = {
                articles: [...action.payload[0]],
                comments: [...action.payload[1]],
                count: action.payload[0].length + action.payload[1].length
            };
            console.log(reported);
            return {
                reported: reported
            }

        case 'DELETE_ARTICLE_REPORTED':
            console.log(action.payload);
            console.log(state.reported.articles);
            const deletedArticleReport = {
                articles: state.reported.articles.filter(item => item.id !== action.payload),
                comments: state.reported.comments,
                count: state.reported.count - 1
            }
            return {
                reported: deletedArticleReport
            }

        case 'DELETE_COMMENT_REPORTED':
            console.log(action.payload);
            console.log(state.reported.articles);
            const deletedCommentReport = {
                articles: state.reported.articles,
                comments: state.reported.comments.filter(item => item.id !== action.payload)
            }
            return {
                reported: deletedCommentReport
            }

        default:
            return {
                reported: state.reported
            }
    }
}

export default reportArticle;

export const loadReports = () => dispatch => {
    axios(`${process.env.REACT_APP_API_URL}/api/moderator/getReports`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        }
    )
    .then(res => {
        console.log(res.data[0])
        console.log(res.data[1])
        dispatch({
            type: 'LOADREPORTS',
            payload: res.data
        })
    })
}

export const deleteArticleReported = articleId => dispatch => {
    console.log(articleId);
    axios.delete(`${process.env.REACT_APP_API_URL}/api/moderator/deleteArticle`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token },
            data: { articleId }
        }
    )
    .then(res => {
        dispatch({
            type: 'DELETE_ARTICLE_REPORTED',
            payload: articleId
        })
    })
}

export const deleteCommentReported = commentId => dispatch => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/moderator/deleteComment`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token },
            data: { commentId }
        }
    )
        .then(res => {
            dispatch({
                type: 'DELETE_COMMENT_REPORTED',
                payload: commentId
            })
        })
}