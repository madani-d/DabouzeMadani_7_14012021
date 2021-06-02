import { db } from '../connectionDB.js';
import dateJsToSql from '../utils/date.js';
import { sqlCreateComment, sqlGetComment } from '../utils/scriptSQL.js';


export const createComment = (req, res, next) => {
    let comment = [
        req.body.userId,
        req.body.articleId,
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        req.body.comment,
        dateJsToSql(),
    ]

    console.log(comment);
    db.query(sqlCreateComment, comment, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ message: "Commentaire publié avec succés !" })
    })
};
