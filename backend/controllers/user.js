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
    console.log(req.body);
    db.query("SELECT email FROM User WHERE email = ?;", req.body.mail, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {// Check if email already exist or not in DB
            return res.status(401).json({ message: 'Email deja utilisé!' });
        }

        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            user.push(// Add request data to array
                req.body.nom,
                req.body.prenom,
                req.body.mail,
                dateJsToSql(),
                hash,)
            console.log(user);

            const sql = "INSERT INTO User " +// SQL request to signin
                "(nom, prenom, email, role, date_signin, mdp) " +
                "VALUES ( ?, ?, ?, 'U', ?, ?);";

            db.query(sql, user, (err, result) => {// Create User in DB
                if (err) throw err;
            })
        })
        .catch(error => res.status(500).json({ error }));

    })
};

exports.login = (req, res, next) => {

    db.query("SELECT COUNT(*) as present FROM User WHERE email = ?",// Check is email already exist in DB
        req.body.mail,
        (err, result) => {
            if (err) throw err;
            if (result[0].present === 0) {// If not 
                return res.status(401).json({ message: "Utilisateur non trouvé." });
            }// If yes
            const sql = "SELECT mdp, id FROM User " +
            "WHERE email = ? ;"
            db.query(sql, req.body.mail, (err, result, fields) => {// Recover password and id
                if (err) throw err;
                console.log(result[0]);
                console.log(fields);
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

