import axios from 'axios';
import { useDispatch } from 'react-redux';

export const RestoreConnection = (token) => {
    const dispatch = useDispatch()
    axios('http://localhost:5000/api/auth/restoreConnection',
    { headers : {
        "authorization": "Bearer " + token,
        }}
    )
    .then(result => {
        console.log(result);
        dispatch({
            type: 'CONNECT'
            })
    })
    .catch(err => false)
}