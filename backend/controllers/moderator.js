import { db } from "../connectionDB.js";
import * as fs from 'fs';
import { sqlDeleteReportedArticle, sqlGetReports } from "../utils/scriptSQL.js";

export const getReports = (req, res, next) => {
    db.query(sqlGetReports,
        res.locals.userId,
        (err, result) => {
            if (err) throw err;
            console.log(result);
            res.status(200).json(result)
        }
    )
}

export const deleteReportedArticle = (req, res, next) => {
    db.query(sqlDeleteReportedArticle,
        req.body.articleId,
        (err, result) => {
            const filename = result[0][0].image_url.split('images/')[1]
            console.log(filename);
            fs.unlink(`images/${filename}`, (error => error));
            if (err) throw err;
            res.status(200).json({ message: "Article signalé supprimé" })
        }
    )
}