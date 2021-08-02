import { Server } from 'socket.io';
import { db } from './connectionDB.js';
import jwt from "jsonwebtoken";
import { sqlAuthToken, sqlChatUserData, sqlInsertMessageChat } from "./utils/scriptSQL.js";
import dateJsToSql from './utils/date.js';


/****************   Chat working with socket.io     *******************/


export const socketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        },
        path:
            '/groupomania_chat/'

    });

    /********* array users stock connected users ********/
    const users = [];
    io.on('connection', socket => {
        // add user id and token to socket
        const { userId, token } = socket.handshake.auth
        if (userId && token) {
            // Authentification connection
            db.query(sqlAuthToken,
                [userId],
                (err, result) => {
                    if (err) console.log(err);
                    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
                    console.log(decodedToken);
                    if (decodedToken.userUuid === result[0].uuid) {
                        console.log('user ' + userId + ' connected');
                    } else {
                        console.log('accés refusé');
                    }
                }
            )
            // Get some data for user connected
            db.query(sqlChatUserData,
                [userId],
                (err, result) => {
                    if (err) throw err;
                    const userData = {
                        prenom: result[0].prenom,
                        nom: result[0].nom,
                        avatar: result[0].avatar,
                        id: userId
                    }
                    socket.username = userData;
                    // Search if user already connected
                    if (users.findIndex(user => user.id === userData.id) === -1) {
                        users.push(userData);
                    } else {
                        console.log('user deja connecté');
                    }
                    // Send new user connected to all users already connected 
                    io.emit('user connected', users)
                }
            )

        } else {
            // if receive no id and token at connection, disconnect socket
            socket.disconnect();
        }
        socket.on('deconnexion', res => {
            // At deconnection find user in array of users connected and remove it
            const index = users.findIndex(user => user.id === res);
            users.splice(index, 1);
            io.emit('user connected', users)
            // Send to all users connected updated array of users connected
            socket.on('disconnect', socket => {
                console.log('user ' + userId + ' disconnected');
            })
        })
        socket.on('chat message', message => {
            // When received chat message
            const date = new Date()
            const datePost = dateJsToSql(date)
            const data = [
                socket.handshake.auth.userId,
                message,
                datePost
            ]
            // Save message in mysql db
            db.query(sqlInsertMessageChat,
                data,
                (err, result) => {
                    if (err) throw err
                    // When it's done send the message to all users
                    io.emit('chat message', {user: {...socket.username}, message, datePost})
                }
            )
        })
    })
}