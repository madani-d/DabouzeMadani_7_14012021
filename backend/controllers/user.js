const db = require('../connectionDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dateJsToSql = () => {// Convert Date to DATETIME SQL
    const date = new Date()
    return date.getUTCFullYear() + '-' +
    ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' +
    ('00' + date.getHours()).slice(-2) + ':' +
    ('00' + date.getMinutes()).slice(-2) + ':' +
    ('00' + date.getSeconds()).slice(-2);
}

exports.signin = (req, res, next) => {
    const user = [];// Create array to fill SQL request
    db.query("SELECT email FROM User WHERE email = ?;", req.body.email, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {// Check if email already exist or not in DB
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
            const sql = "INSERT INTO User " +// SQL request to signin
                        "(nom, prenom, email, role, date_signin, mdp) " +
                        "VALUES ( ?, ?, ?, 'U', ?, ?);";

            db.query(sql, user, (err, result) => {// Create User in DB
                if (err) throw err;
                console.log(result.insertId);
                res.status(200).json({// Create and send token
                    userId: result.insertId,
                    token: jwt.sign(
                    {userId: result.insertId},
                    "SECRET_TOKEN_KEY",
                    {expiresIn: '24h'}
                    )
                })
            })
        })
        .catch(error => res.status(500).json({ error }));

    })
};

exports.login = (req, res, next) => {

    db.query("SELECT COUNT(*) as present FROM User WHERE email = ?",// Check is email already exist in DB
        req.body.email,
        (err, result) => {
            if (err) throw err;
            if (result[0].present === 0) {// If not 
                return res.status(401).json({ message: "Utilisateur non trouvé." });
            }// If yes
            const sql = "SELECT mdp, id FROM User " +
                        "WHERE email = ? ;"
            db.query(sql, req.body.email, (err, result, fields) => {// Recover password and id
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
                            "SECRET_TOKEN_KEY",
                            {expiresIn: '24h'}
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error }));
            })
    })
};

