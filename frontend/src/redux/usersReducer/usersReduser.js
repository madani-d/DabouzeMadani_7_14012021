import axios from 'axios';

const INITIAL_USERS_STATE = {
    users: []
}

function usersReducer(state = INITIAL_USERS_STATE, action) {
    switch(action.type) {
        case 'LOADUSERS':
            console.log(action.payload);
            const users = action.payload;
            const userId = JSON.parse(localStorage.storageToken).userId
            const user = users.find(item => item.id === userId)
            console.log(user);
            return {
                users: action.payload
            }
        default:
            return {
                users: state.users
            }
    }
}

export default usersReducer;

export const getUsers = () => dispatch => {
    console.log('chargement users');
    axios(`${process.env.REACT_APP_API_URL}/api/auth/getUsers`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        } 
    )
    .then(res => {
        dispatch({
            type: 'LOADUSERS',
            payload: res.data.result
        })
        console.log(res.data.result);
    })
}

export const getUser = () => dispatch => {
    axios(`${process.env.REACT_APP_API_URL}/api/auth/getUser`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        } 
    )
    .then(res => {
        console.log(res.data);
    })
}

export const updateAvatar = data => dispatch => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/auth/updateAvatar`,
        data,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        } 
    )
    .then(res => {
        console.log(res);
    })
}