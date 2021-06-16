import { db } from '../connectionDB.js';
import dateJsToSql from '../utils/date.js';
import {
    sqlCreateComment,
    sqlGetComment,
    sqlDeleteComment,
    sqlUpdateComment,
    sqlReportComment
} from '../utils/scriptSQL.js';


export const createComment = (req, res, next) => {
    const date = new Date()
    let comment = [
        req.body.userId,
        req.body.articleId,
        // `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        req.body.comment,
        dateJsToSql(date),
    ]

    console.log(comment);
    db.query(sqlCreateComment, comment, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ message: "Commentaire publié avec succés !" })
    })
};

export const deleteComment = (req, res, next) => {
    const data = [req.body.commentId, res.locals.userId]
    db.query(sqlDeleteComment, data, (err, result) => {
        if (err) throw err;
        console.log('supprimé');
        res.status(200).json({ message: "commentaire supprimé" })
    })
}

export const updateComment = (req, res, next) => {
    const data = [req.body.comment, req.body.commentId, res.locals.userId]
    db.query(sqlUpdateComment, data, (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: "commetaire modifié" })
    })
} 

export const reportComment = (req, res, next) => {
    const data = [res.locals.userId, req.body.commentId]
    db.query(sqlReportComment, data, (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: "commentaire signalé" })
    })
}