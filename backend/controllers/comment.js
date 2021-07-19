import { db } from '../connectionDB.js';
import dateJsToSql from '../utils/date.js';
import {
    sqlCreateComment,
    sqlGetComment,
    sqlDeleteComment,
    sqlUpdateComment,
    sqlReportComment,
    sqlCheckCommentReported
} from '../utils/scriptSQL.js';


export const createComment = (req, res, next) => {
    const date = new Date()
    let comment = [
        res.locals.userId,
        req.body.articleId,
        dateJsToSql(date),
        req.body.comment,
    ]

    // Use stocked procedure
    // Insert comment in Mysql db
    // Then get all data comment and send it to front
    db.query(sqlCreateComment, comment, (err, result) => {
        if (err) throw err;
        const results = result[0][0];
        const newComment = {
            id: results.id,
            avatar: results.avatar,
            nom: results.nom,
            prenom: results.prenom,
            user_id: res.locals.userId,
            date_post: dateJsToSql(results.date_post),
            texte_commentaire: req.body.comment,
            commentLikes: 0,
            liked: false,
            updateComment: true
        }
        res.status(200).json(newComment)
    })
};

export const deleteComment = (req, res, next) => {
    // Delete comment
    const data = [req.body.commentId, res.locals.userId]
    db.query(sqlDeleteComment, data, (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: "commentaire supprimé" })
    })
}

export const updateComment = (req, res, next) => {
    // Update comment
    const data = [req.body.texte_commentaire, req.body.commentId, res.locals.userId]
    db.query(sqlUpdateComment, data, (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: "commetaire modifié" })
    })
} 

export const reportComment = (req, res, next) => {
    const data = [res.locals.userId, req.body.commentId]
    // Check if user aleady reported this comment
    db.query(sqlCheckCommentReported,
        data,
        (err, result) => {
            if (result[0]) {
                res.status(200).json({ message: "déja signalé" })
            } else {
                // If not report comment
                db.query(sqlReportComment, data, (err, result) => {
                    if (err) throw err;
                    res.status(201).json({ message: "commentaire signalé" })
                })
            }
    })
}