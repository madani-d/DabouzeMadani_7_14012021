import { db } from "../connectionDB.js";
import * as fs from 'fs';
import { sqlDeleteReportedArticle, sqlDeleteReportedComment, sqlGetReports } from "../utils/scriptSQL.js";

export const getReports = (req, res, next) => {
    // Use stocked procedure
    // Get all reported articles
    // And get all reported comments
    db.query(sqlGetReports,
        res.locals.userId,
        (err, result) => {
            if (err) res.status(500).json({error: "erreur serveur"});
            res.status(200).json(result)
        }
    )
}

export const deleteReportedArticle = (req, res, next) => {
    // Use stocked procedure
    // Get file picture article file name and delete it
    // And delete article
    db.query(sqlDeleteReportedArticle,
        req.body.articleId,
        (err, result) => {
            if (err) res.status(500).json({error: "erreur serveur"});
            const filename = result[0][0].image_url.split('images/')[1]
            fs.unlink(`images/${filename}`, (error => error));
            res.status(200).json({ message: "Article signalé supprimé" })
        }
    )
}

export const deleteReportedComment = (req, res, next) => {
    // Delete reported comment
    db.query(sqlDeleteReportedComment,
        req.body.commentId,
        (err, result) => {
            if (err) res.status(500).json({error: "erreur serveur"});
            res.status(200).json({ message: "Commentaire signalé supprimé" })
        }
    )
}