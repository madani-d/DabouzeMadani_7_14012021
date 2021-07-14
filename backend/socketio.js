import { Server } from 'socket.io';
import { db } from './connectionDB.js';
import jwt from "jsonwebtoken";
import { sqlAuthToken, sqlChatUserData, sqlInsertMessageChat } from "./utils/scriptSQL.js";
import dateJsToSql from './utils/date.js';




export const socketIO = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "*"
        },
        path:
            '/groupomania_chat/'

    });
    const users = []
    io.on('connection', socket => {
        console.log('connexion');
        const { userId, token } = socket.handshake.auth
        if (userId && token) {
            db.query(sqlAuthToken,
                [userId],
                (err, result) => {
                    if (err) console.log(err);
                    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
                    if (decodedToken.userUuid === result[0].uuid) {
                        console.log('chat ouvert');
                        console.log(userId);
                    } else {
                        console.log('accés refusé');
                    }
                }
            )
            db.query(sqlChatUserData,
                [userId],
                (err, result) => {
                    if (err) throw err;
                    // console.log(result);
                    const userData = {
                        prenom: result[0].prenom,
                        nom: result[0].nom,
                        avatar: result[0].avatar,
                        id: userId
                    }
                    // console.log(userData);
                    socket.username = userData;
                    if (users.findIndex(user => user.id === userData.id) === -1) {
                        users.push(userData);
                    } else {
                        console.log('user deja connecté');
                    }
                    io.emit('user connected', users)
                }
            )

        } else {
            socket.disconnect();
        }
        socket.on('deconnexion', res => {
            const index = users.findIndex(user => user.id === res);
            users.splice(index, 1);
            io.emit('user connected', users)
            socket.on('disconnect', socket => {
                console.log('deconnection');
            })
        })
        socket.on('chat message', message => {
        // console.log(socket.handshake.auth.userId);
            const date = new Date()
            const datePost = dateJsToSql(date)
            const data = [
                socket.handshake.auth.userId,
                message,
                datePost
            ]
            db.query(sqlInsertMessageChat,
                data,
                (err, result) => {
                    if (err) throw err
                    io.emit('chat message', {user: {...socket.username}, message, datePost})
                }
            )
        })
    })
}