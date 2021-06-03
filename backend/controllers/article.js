import { db } from '../connectionDB.js';
import dateJsToSql from '../utils/date.js';
import jwt from 'jsonwebtoken';
import { sqlCreateArticle, sqlGetAllArticle, sqlGetComment, sqlGetLikedPost } from '../utils/scriptSQL.js';



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

export const getAllArticle = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    const userId = decodedToken.userId;

    const getArticles = async () => {
        return new Promise((resolve, reject) => {
            db.query(sqlGetAllArticle, (err, result) => {
                    if (err) throw err;
                    const resultArr = [...result];
                    for (let i = 0; i < resultArr.length; i++) {
                        resultArr[i].user_id === userId ?
                            resultArr[i].updateArticle = true
                        :
                            resultArr[i].updateArticle = false
                    }
                    resolve(result)
            })
        }) 
    }

    const getComments = async (articleId) => {
        return new Promise((resolve, reject) => {
            db.query(sqlGetComment, articleId, (err, result) => {
                if (err) throw err;
                const resultArr = [...result];
                for (let i = 0; i < resultArr.length; i++) {
                    resultArr[i].user_id === userId ?
                        resultArr[i].updateComment = true
                    :
                    resultArr[i].updateComment = false
                }
                resolve(resultArr)
            })
        })
    }

    const getLikedPost = async (articleId) => {
        const likesId = [
            userId,
            articleId
        ]
        console.log(likesId);
        return new Promise((resolve, reject) => {
            db.query(sqlGetLikedPost, likesId, (err, result) => {
                if (err) throw err;
                resolve(result)
            })
        })

    }

    const essai = async () => {
        const article = await getArticles();
        for (let i = 0; i < article.length; i++) {
            const comments = await getComments(article[i].id)
            article[i].comments = comments
            
            const like = await getLikedPost(article[i].id)
            like[0].postLiked ?
                article[i].liked = true
            :
                article[i].liked = false;
        }
        res.status(200).json({ article })
    }
    essai();
}