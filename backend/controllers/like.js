import { db } from '../connectionDB.js';
import {
    sqlLikeArticle,
    sqlLikeComments,
    sqlRemoveLikedArticle,
    sqlRemoveLikedComment
} from '../utils/scriptSQL.js';

export const createLikeArticle = (req, res, next) => {
    const likeArticleData = [
        res.locals.userId,
        req.body.articleId
    ]

    db.query(
        sqlLikeArticle,
        likeArticleData,
        (err, result) => {
            if (err) res.status(500).json({error: "erreur serveur"});
            res.status(200).json({ message: "Like ajouté!" })
        })
}

export const removeLikeArticle = (req, res, next) => {
    const removeLikeData = [
        res.locals.userId,
        req.body.articleId
    ]

    db.query(
        sqlRemoveLikedArticle,
        removeLikeData,
        (err, result)=> {
            if (err) res.status(500).json({error: "erreur serveur"});
            res.status(201).json({ message: "like supprimé" })
        }
    )
}

export const createLikeComment = (req, res, next) => {
    const likeArticleData = [
        res.locals.userId,
        req.body.commentId
    ]

    db.query(
        sqlLikeComments,
        likeArticleData,
        (err, result) => {
            if (err) res.status(500).json({error: "erreur serveur"});
            res.status(200).json({ message: "Like ajouté!" })
        })
}

export const removeLikeComment = (req, res, next) => {
    const removeLikeData = [
        res.locals.userId,
        req.body.commentId
    ]

    db.query(
        sqlRemoveLikedComment,
        removeLikeData,
        (err, result)=> {
            if (err) res.status(500).json({error: "erreur serveur"});
            res.status(201).json({ message: "like supprimé" })
        }
    )
}