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
        res.locals.userId,
        req.body.articleId,
        // `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        dateJsToSql(date),
        req.body.comment,
    ]

    db.query(sqlCreateComment, comment, (err, result) => {
        if (err) throw err;
        console.log(result[0][0].id);
        const results = result[0][0];
        const newComment = {
            id: results.id,
            avatar: results.avatar,
            nom: results.nom,
            prenom: results.prenom,
            user_id: res.locals.userId,
            date_post: dateJsToSql(results.date_post),
            texte_commentaire: req.body.comment,
            commentsLikes: 0,
            liked: false,
            updateComment: true
        }
        res.status(200).json(newComment)
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