import { db } from '../connectionDB.js';
import dateJsToSql from '../utils/date.js';
import * as fs  from 'fs';
import {
    sqlCreateArticle,
    sqlGetAllArticle,
    sqlGetComment,
    sqlGetLikedArticle,
    sqlGetLikedComment,
    sqlDeleteArticle,
    sqlGetDeleteFilename,
    sqlUpdateArticle,
    sqlUpdateArticleText,
    sqlReportArticle,
    sqlGetArticles
} from '../utils/scriptSQL.js';

// Create Article

export const createArticle = (req, res, next) => {
    console.log(req.body);
    const date = new Date()
    let article = [
        res.locals.userId,
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        req.body.article,
        dateJsToSql(date),
    ]

    console.log(article);
    console.log("rêquete reçu");
    db.query(sqlCreateArticle, article, (err, result) => {
        if (err) throw err;
        const article = result[0][0];
        const newArticle = {
            id: article.id,
            user_id: article.user_id,
            image_url: article.image_url,
            texte_article: article.texte_article,
            date_post: dateJsToSql(article.date_post),
            articleLikes: 0,
            avatar: article.avatar,
            nom: article.nom,
            prenom: article.prenom,
            updateArticle: true,
            comments: [],
        }
        res.status(200).json( newArticle )
    })

}

// Get all articles

export const getArticles = (req, res, next) => {
    const userId = res.locals.userId;
    db.query(sqlGetArticles, [userId, userId], (err, result) => {
        if (err) throw err;
        console.log(result);
        const articles = []
        for (let i = 0; i < result.length; i++) {
            const comments = {}
            if (result[i].commentId) {
                    comments.avatar = result[i].commentAvatar;
                    comments.commentLikes = result[i].commentLikes;
                    comments.id = result[i].commentId;
                    comments.nom = result[i].commentUserNom;
                    comments.prenom = result[i].commentUserPrenom;
                    comments.texte_commentaire = result[i].texte_commentaire;
                    comments.updateComment = userId === result[i].commentUserId ? true  : false;
                    comments.user_id = result[i].commentUserId;
                    comments.liked = result[i].commentLiked;
            }
            const index = articles.length - 1;
            if (articles[index] && articles[index].id === result[i].id) {
                articles[index].comments.push(comments);
            } else {
                articles.push({
                    id: result[i].id,
                    user_id: result[i].user_id,
                    image_url: result[i].image_url,
                    texte_article: result[i].texte_article,
                    date_post: result[i].date_post,
                    articleLikes: result[i].articleLikes,
                    avatar: result[i].avatar,
                    nom: result[i].nom,
                    prenom: result[i].prenom,
                    updateArticle: userId === result[i].user_id ? true : false,
                    comments: result[i].commentId ? [comments] : [],
                    liked: result[i].liked,
                })
            }
            
        }
        res.status(200).json( articles )
    })
}

// export const getAllArticle = (req, res, next) => {
//     const userId = res.locals.userId;


//     // Get all articles
//     const getArticles = async () => {
//         return new Promise((resolve, reject) => {
//             db.query(sqlGetAllArticle, (err, result) => {
//                     if (err) throw err;
//                     const resultArr = [...result];
//                     for (let i = 0; i < resultArr.length; i++) {
//                         // If article been create by user get true to updateArticle
//                         resultArr[i].user_id === userId ?
//                             resultArr[i].updateArticle = true
//                         :
//                             resultArr[i].updateArticle = false
//                     }
//                     resolve(result)
//             })
//         }) 
//     }

//     //Get for each comment if is liked by user
//     const getLikedComment = async (commentId) => {
//         const likesId = [
//             userId,
//             commentId
//         ]
//         return new Promise((resolve, reject) => {
//             db.query(sqlGetLikedComment, likesId, (err, result) => {
//                 if (err) throw err;
//                 resolve(result)
//             })
//         })
//     }

//     // Get comment for each article 
//     const getComments = async (articleId) => {
//         return new Promise((resolve, reject) => {
//             db.query(sqlGetComment, articleId, (err, result) => {
//                 if (err) throw err;
//                 const resultArr = [...result];
//                 for (let i = 0; i < resultArr.length; i++) {
//                         // If comment been/not create by user put true/false to updateComment
//                     resultArr[i].user_id === userId ?
//                         resultArr[i].updateComment = true
//                     :
//                     resultArr[i].updateComment = false
//                 }
//                 resolve(resultArr)
//             })
//         })
//     }

//     //Get for each article if is liked by user
//     const getLikedArticle = async (articleId) => {
//         const likesId = [
//             userId,
//             articleId
//         ]
//         return new Promise((resolve, reject) => {
//             db.query(sqlGetLikedArticle, likesId, (err, result) => {
//                 if (err) throw err;
//                 resolve(result)
//             })
//         })

//     }

//     const sendData = async () => {
//         // get all article
//         const article = await getArticles();
//         for (let i = 0; i < article.length; i++) {
//             article[i].date_post = dateJsToSql(article[i].date_post)
//             // Get all comment for each article
//             const comments = await getComments(article[i].id)
//             for (let k = 0; k < comments.length; k++) {
//                 const liked = await getLikedComment(comments[k].id)

//                 // If comment is/not liked by user put true/false to liked
//                 liked[0].liked ?
//                     comments[k].liked = true
//                 :
//                     comments[k].liked = false
//             }
//             // Put comments to each articles
//             article[i].comments = comments

//             const like = await getLikedArticle(article[i].id)
//             // If article is/not liked by user put true/false to liked
//             like[0].articleLiked ?
//                 article[i].liked = true
//             :
//                 article[i].liked = false;
//         }
//         res.status(200).json({ article })
//     }
//     sendData();
// }

export const deleteArticle = (req, res, next) => {
    console.log(req.body);
    const data = [req.body.articleId, res.locals.userId]
    db.query(sqlGetDeleteFilename, data, (err, result) => {
        if (err) throw err;
        const filename = result[0].image_url.split('images/')[1]
        fs.unlink(`images/${filename}`, 
            (error => {
                if (error) console.log(error);
            })
        );
    })

    db.query(sqlDeleteArticle, data, (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: "article supprimé" })
    })
};

export const updateArticle = (req, res, next) => {
    const data = [
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        req.body.article,
        req.body.articleId,
        res.locals.userId,
    ]
    db.query(sqlUpdateArticle, data, (err, result) => {
        if (err) throw err;
        const response = {
            image_url: data[0],
            article: data[1]
        }
        console.log(response);
        res.status(201).json(response)
    })
}

export const updateArticleText = (req, res, next) => {
    console.log(req.body);
    const data = [
        req.body.article,
        req.body.articleId,
        res.locals.userId,
    ]
    db.query(sqlUpdateArticleText, data, (err, result) => {
        if (err) throw err;
        res.status(201).json(req.body.article)
    })
}

export const reportArticle = (req, res, next) => {
    console.log(req.body);
    const data = [res.locals.userId, req.body.articleId]
    db.query(sqlReportArticle, data, (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: "article signalé" })
    })
}