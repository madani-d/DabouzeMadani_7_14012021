import { db } from '../connectionDB.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dateJsToSql from '../utils/date.js';
import * as fs from 'fs';
import { v5 as uuidv5 } from 'uuid';
import {
    sqlCheckEmail,
    sqlSignin,
    sqllogin,
    sqlGetAllUsers,
    sqlUpdateAvatar
} from '../utils/scriptSQL.js';


export const signin = (req, res, next) => {
    const user = [];// Create array to fill SQL request
    db.query(
        sqlCheckEmail,
        req.body.email,
        (err, result) => {

        if (err) throw err;

        if (result[0].present > 0) {// Check if email already exist or not in DB
            return res.status(401).json({ message: 'Email deja utilisé!' });
        }
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const date = new Date()
            user.push(// Add request data to array
                req.body.nom,
                req.body.prenom,
                req.body.email,
                dateJsToSql(date),
                hash,)
            const namespace = `1b671a64-40d5-491e-99b0-da01ff1f3341`;
            const id = `${user[0]}${user[3]}`;
            const uuid = uuidv5(id, namespace);
            user.push(uuid);

            db.query(sqlSignin, user, (err, result) => {// Create User in DB
                if (err) throw err;
                res.status(200).json({// Create and send token
                    userId: result.insertId,
                    token: jwt.sign(
                    {userUuid: uuid},
                    process.env.SECRET_TOKEN_KEY,
                    {expiresIn: '24h'}
                    )
                })
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error })});

    })
};

export const login = (req, res, next) => {
    console.log(req.body);

    db.query(
        sqlCheckEmail,
        req.body.email,
        (err, result) => {// Check is email already exist in DB
            if (err) throw err;
            if (!result[0].present) {// If not 
                return res.status(401).json({ message: "Utilisateur non trouvé." });
            }// If yes

            db.query(
                sqllogin,
                req.body.email,
                (err, result) => {// Recover password and id
                if (err) throw err;
                bcrypt.compare(req.body.password, result[0].mdp)// Compare Emails
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Mot de passe incorrect.' })
                        }
                        res.status(200).json({// Create and send Token
                            userId: result[0].id,
                            userRole: result[0].role === 'M' ? 'Moderator' : 'User',
                            token: jwt.sign(
                            {userUuid: result[0].uuid},
                            process.env.SECRET_TOKEN_KEY,
                            {expiresIn: '24h'},
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error }));
            })
    })
};

export const restoreConnection = (req, res, next) => {
    res.status(200).json({ message: 'Reconnexion réussie'})
}

export const getAllUsers = (req, res, next) => {
    db.query(
        sqlGetAllUsers,
        (err, result) => {
            if (err) throw err;
            res.status(200).json({ result })
        }
    )
}

export const updateAvatar = (req, res, next) => {
    const data = [
        req.body.userId,
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    ];
    console.log(data);
    console.log(req.body);
    db.query(
        sqlUpdateAvatar,
        data,
        (err, result) => {
            console.log(result[0][0].avatar);
            const filename = result[0][0].avatar.split('images/')[1]
            fs.unlink(`images/${filename}`, (error => error));
            res.status(200).json(result[1])
        }
    )
}