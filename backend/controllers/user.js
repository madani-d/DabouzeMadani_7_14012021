import { db } from '../connectionDB.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dateJsToSql from '../utils/date.js';
import { sqlCheckEmail, sqlSignin, sqllogin } from '../utils/scriptSQL.js';


export const signin = (req, res, next) => {
    const user = [];// Create array to fill SQL request
    db.query(sqlCheckEmail, req.body.email, (err, result) => {
        if (err) throw err;

        if (result[0].present > 0) {// Check if email already exist or not in DB
            return res.status(401).json({ message: 'Email deja utilisé!' });
        }
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            user.push(// Add request data to array
                req.body.nom,
                req.body.prenom,
                req.body.email,
                dateJsToSql(),
                hash,)

            db.query(sqlSignin, user, (err, result) => {// Create User in DB
                if (err) throw err;
                console.log(process.env.SECRET_TOKEN_KEY);
                res.status(200).json({// Create and send token
                    userId: result.insertId,
                    token: jwt.sign(
                    {userId: result.insertId},
                    process.env.SECRET_TOKEN_KEY,
                    {expiresIn: '24h'}
                    )
                })
            })
        })
        .catch(error => res.status(500).json({ error }));

    })
};

export const login = (req, res, next) => {
    console.log(req.body);

    db.query(sqlCheckEmail, req.body.email, (err, result) => {// Check is email already exist in DB
            if (err) throw err;
            if (!result[0].present) {// If not 
                return res.status(401).json({ message: "Utilisateur non trouvé." });
            }// If yes

            db.query(sqllogin, req.body.email, (err, result, fields) => {// Recover password and id
                if (err) throw err;
                bcrypt.compare(req.body.password, result[0].mdp)// Compare Emails
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect.' })
                        }
                        res.status(200).json({// Create and send Token
                            userId: result[0].id,
                            token: jwt.sign(
                            {userId: result[0].id},
                            process.env.SECRET_TOKEN_KEY,
                            {expiresIn: '24h'}
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