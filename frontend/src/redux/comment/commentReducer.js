import axios from 'axios';

const INITIAL_COMMENT_STATE = {
    comments: []
}

function commentReducer(state = INITIAL_COMMENT_STATE, action) {

    switch(action.type) {
        case 'LOADCOMMENT':
            return {
                comments: action.payload
            }

        default:
            return {
                comments: state.comments
            }
    }
}

export default commentReducer;

export const getComment = (articleId) => dispatch => {

    axios(`${process.env.REACT_APP_API_URL}/api/getComment/` + articleId,
        { headers: {
            "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        }}
    )
    .then(res => {
        console.log(res.data.result.nom);
        dispatch({
            type: 'LOADCOMMENT',
            payload: res.data.result
        })
    })
}