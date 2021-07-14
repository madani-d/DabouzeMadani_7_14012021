import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../Components/Header/Header';
import './CharRoom.scss';
import { loadChat } from '../../redux/socketReducer/socketReducer';
import io from 'socket.io-client';

let socket;
export default function ChatRoom() {
    const { messages } = useSelector(state => state.socketReducer)
    const [ messagesList, setMessagesList ] = useState(messages)
    const [ users, setUsers ] = useState([])
    const dispatch = useDispatch()
    const me = parseInt(JSON.parse(localStorage.storageToken).userId)
    
    useEffect(() => {
        socket = io(process.env.REACT_APP_API_URL, {path: '/groupomania_chat/'});
        socket.auth = localStorage.storageToken && { 
            token: JSON.parse(localStorage.storageToken).token,
            userId: JSON.parse(localStorage.storageToken).userId
        }
        socket.connect();
        dispatch(loadChat());
        setMessagesList(messages);
        return () => {
            socket.disconnect(socket.auth.userId);
            socket.close();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setMessagesList(messages)
    }, [messages])

    useEffect(() => {
        socket.on('chat message', message => {
            setMessagesList([...messages, message])
        })
        socket.on('user connected', users => {
            setUsers(users)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[socket])

    const handleSubmit = e => {
        e.preventDefault()
        socket.emit('chat message', e.target[0].value);
    }

    console.log(users);

    return (
        <>
            <Header/>
            <ul className="users-list light-container">
                {users && users.map((item, index) => ( 
                    <li key={index}>
                        <img src={item.avatar} alt="avatar" />
                        {item.id === me ?
                            <span>
                                vous
                            </span>
                        :
                            <span>
                            {item.prenom} {item.nom}
                            </span>
                        }
                    </li>
                ))}
            </ul>
            <ul className="chat-list">
                {messagesList && messagesList.map((item, index) => (
                    <li 
                        className={
                            item.user.id === me ?
                            "chat-message-me chat-message"
                            :
                            "chat-message-other chat-message"
                        }
                        key={index}>
                        <img src={item.user.avatar} alt="avatar" />
                    <div>
                        <div className="light-container chat-message-text">
                            {item.message}
                        </div>
                        {item.user.id === me ?
                            <span>
                                vous
                            </span>
                        :
                            <span>
                                {item.user.prenom} {item.user.nom} 
                            </span>
                        }
                    </div>
                    </li>
                ))}
            </ul>
            <form className="chat-form"
                onSubmit={e => handleSubmit(e)}>
                <input type="text"/>
                <button className="chat-button">envoyer</button>
            </form>
        </>
    )
}
