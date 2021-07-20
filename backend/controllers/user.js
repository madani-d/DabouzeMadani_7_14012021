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
    sqlUpdateAvatar,
    sqlDeleteAccount
} from '../utils/scriptSQL.js';
import { validationResult } from 'express-validator';


export const signin = (req, res, next) => {
    // If error from express validator send error message to the front 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const user = [];// Create array to fill SQL request
    db.query(
        sqlCheckEmail,
        req.body.email,
        (err, result) => {

        if (err) res.status(500).json({error: "erreur serveur"});

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
                // Create a uuid from name and date time signin
            const namespace = `1b671a64-40d5-491e-99b0-da01ff1f3341`;
            const id = `${user[0]}${user[3]}`;
            const uuid = uuidv5(id, namespace);
            user.push(uuid);

            db.query(sqlSignin, user, (err, result) => {
                // Insert User in DB
                if (err) res.status(500).json({error: "erreur serveur"});
                res.status(200).json({
                    // Create and send token
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
            res.status(500).json({ error })});

    })
};

export const login = (req, res, next) => {
    db.query(
        sqlCheckEmail,
        req.body.email,
        (err, result) => {
            // Check is email already exist in DB
            if (err) res.status(500).json({error: "erreur serveur"});
            if (!result[0].present) {
                // If not 
                return res.status(401).json({ message: "Utilisateur non trouvé." });
            }
            // If yes continue

            db.query(
                sqllogin,
                req.body.email,
                (err, result) => {
                    // Recover password and id
                if (err) res.status(500).json({error: "erreur serveur"});
                bcrypt.compare(req.body.password, result[0].mdp)
                // Compare Emails
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Mot de passe incorrect.' })
                        }
                        res.status(200).json({
                            // Create and send Token
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
    // If auth ok restore connection 
    res.status(200).json({ message: 'Reconnexion réussie'})
}

export const getAllUsers = (req, res, next) => {
    // Get all users 
    db.query(
        sqlGetAllUsers,
        (err, result) => {
            if (err) res.status(500).json({error: "erreur serveur"});
            res.status(200).json({ result })
        }
    )
}

export const updateAvatar = (req, res, next) => {
    console.log(req.file);
    const data = [
        req.body.userId,
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    ];
    console.log(data);
    console.log(req.body);
    // Use Stored procedure
    // First time recover avatar name to remove it
    // Then replace by new avatar and send it to the front
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

export const deleteAccount = (req, res) => {
    const userId = res.locals.userId
    // Use stocked procedure
    // First time recover all file name (avatar and post picture) to delete them
    // Then delete the user and all post, comment and chat message (ON DELETE CASCADE)
    db.query(sqlDeleteAccount,
        userId,
        (err, result) => {
            const imageToDeleted = [];
            imageToDeleted.push(result[0][0].avatar)
            if (result[1].length > 0) {
                for (const item of result[1]) {
                    imageToDeleted.push(item.image_url)
                }
            }
            console.log(imageToDeleted);
            for (const image of imageToDeleted) {
                const filename = image.split('images/')[1];
                console.log(filename);
                fs.unlink(`images/${filename}`, (error => error))
            }
            res.status(200).json({message: "compte supprimé avec succés"})
        }
    )
}