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
    io.use((socket, next) => {
        const { userId, token } = socket.handshake.auth
        if (userId && token) {
            db.query(sqlAuthToken,
                [userId],
                (err, result) => {
                    if (err) console.log(err);
                    console.log(userId);
                    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
                    if (decodedToken.userUuid === result[0].uuid) {
                        console.log('chat ouvert');
                        next()
                    } else {
                        console.log('accés refusé');
                    }
                }
            )
        }
    })
    io.use((socket, next) => {
        db.query(sqlChatUserData,
            [socket.handshake.auth.userId],
            (err, result) => {
                if (err) throw err;
                const userData = {
                    prenom: result[0].prenom,
                    nom: result[0].nom,
                    avatar: result[0].avatar
                }
                socket.username = userData;
            }
        )
        next();
    })
    io.on('connection', socket => {
        console.log('connect');
        socket.on('chat message', message => {
            console.log(message);
            console.log(socket.handshake.auth.userId);
            const date = new Date()
            const datePost = dateJsToSql(date)
            io.emit('chat message', {user: socket.username, message, datePost})
            const data = [
                socket.handshake.auth.userId,
                message,
                datePost
            ]
            db.query(sqlInsertMessageChat,
                data,
                (err, result) => {
                    if (err) throw err
                    console.log(result);
                }
            )
        })
    })
}