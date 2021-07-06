import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../Components/Header/Header';
import io from 'socket.io-client';
import './CharRoom.scss';
import { loadChat } from '../../redux/socketReducer/socketReducer';
const socket = io(process.env.REACT_APP_API_URL, {path: '/groupomania_chat/'});
socket.auth = localStorage.storageToken && { 
    token: JSON.parse(localStorage.storageToken).token,
    userId: JSON.parse(localStorage.storageToken).userId
}
socket.connect();

export default function ChatRoom() {
    const { messages } = useSelector(state => state.socketReducer)
    const [messagesList, setMessagesList] = useState([{user: "me", message: "hello world !"}])
    const dispatch = useDispatch()
    console.log(messages);
    
    useEffect(() => {
        dispatch(loadChat())

    }, [])

    useEffect(() => {
        socket.on('chat message', message => {
            console.log(messages);
            messages.push(message)
        })
    }, [socket, messages])
    console.log(messagesList);

    const handleSubmit = e => {
        e.preventDefault()
        console.log(e.target[0].value);
        socket.emit('chat message', e.target[0].value)
    }


    return (
        <>
            <Header/>
            <ul className="chat-list">
                {messages && messages.map((item, index) => (
                    <li key={index}>{item.message}</li>
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
