import { db } from '../connectionDB.js';
import dateJsToSql from '../utils/date.js';
import { sqlCreateArticle, sqlGetAllArticle } from '../utils/scriptSQL.js'



export function createArticle(req, res, next) {
    let article = [
        req.body.userId,
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        req.body.article,
        dateJsToSql(),
    ]

    console.log(article);
    console.log("rêquete reçu");
    db.query(sqlCreateArticle, article, (err, result) => {
        if (err) throw err;
        console.log("requête validé");
        res.status(200).json({ message: "Article publié avec succés !" })
    })

}

export function getAllArticle(req, res, next) {
    db.query(sqlGetAllArticle, (err, result) => {
        if (err) throw err;
        res.send({result});
        next();
    })
}