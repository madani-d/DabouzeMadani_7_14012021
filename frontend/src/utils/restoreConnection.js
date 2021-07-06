import axios from 'axios';
import { useDispatch } from 'react-redux';

export const RestoreConnection = () => {
    const dispatch = useDispatch()
    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/restoreConnection`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        } 
    )
    .then(result => {
        console.log(result);
        dispatch({
            type: 'CONNECT'
            })
    })
    // .catch(err => {
    //     console.log(err.response.data.error.message);
    //     if (err) {
    //         dispatch({
    //             type: 'DISCONNECT'
    //         })
    //     }
    // })
}