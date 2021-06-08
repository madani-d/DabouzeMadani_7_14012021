import { db } from '../connectionDB.js';
import dateJsToSql from '../utils/date.js';
import {
    sqlCreateArticle,
    sqlGetAllArticle,
    sqlGetComment,
    sqlGetLikedArticle,
    sqlGetLikedComment
} from '../utils/scriptSQL.js';

// Create Article

export const createArticle = (req, res, next) => {
    console.log(req.body);
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

// Get all articles

export const getAllArticle = (req, res, next) => {
    const userId = res.locals.userId;


    // Get all articles
    const getArticles = async () => {
        return new Promise((resolve, reject) => {
            db.query(sqlGetAllArticle, (err, result) => {
                    if (err) throw err;
                    const resultArr = [...result];
                    for (let i = 0; i < resultArr.length; i++) {
                        // If article been create by user get true to updateArticle
                        resultArr[i].user_id === userId ?
                            resultArr[i].updateArticle = true
                        :
                            resultArr[i].updateArticle = false
                    }
                    resolve(result)
            })
        }) 
    }

    //Get for each comment if is liked by user
    const getLikedComment = async (commentId) => {
        const likesId = [
            userId,
            commentId
        ]
        return new Promise((resolve, reject) => {
            db.query(sqlGetLikedComment, likesId, (err, result) => {
                if (err) throw err;
                resolve(result)
            })
        })
    }

    // Get comment for each article 
    const getComments = async (articleId) => {
        return new Promise((resolve, reject) => {
            db.query(sqlGetComment, articleId, (err, result) => {
                if (err) throw err;
                const resultArr = [...result];
                for (let i = 0; i < resultArr.length; i++) {
                        // If comment been/not create by user put true/false to updateComment
                    resultArr[i].user_id === userId ?
                        resultArr[i].updateComment = true
                    :
                    resultArr[i].updateComment = false
                }
                resolve(resultArr)
            })
        })
    }

    //Get for each article if is liked by user
    const getLikedArticle = async (articleId) => {
        const likesId = [
            userId,
            articleId
        ]
        return new Promise((resolve, reject) => {
            db.query(sqlGetLikedArticle, likesId, (err, result) => {
                if (err) throw err;
                resolve(result)
            })
        })

    }

    const sendData = async () => {
        // get all article
        const article = await getArticles();
        for (let i = 0; i < article.length; i++) {
            // Get all comment for each article
            const comments = await getComments(article[i].id)
            for (let k = 0; k < comments.length; k++) {
                const liked = await getLikedComment(comments[k].id)

                // If comment is/not liked by user put true/false to liked
                liked[0].liked ?
                    comments[k].liked = true
                :
                    comments[k].liked = false
            }
            // Put comments to each articles
            article[i].comments = comments

            const like = await getLikedArticle(article[i].id)
            // If article is/not liked by user put true/false to liked
            like[0].articleLiked ?
                article[i].liked = true
            :
                article[i].liked = false;
        }
        res.status(200).json({ article })
    }
    sendData();
}