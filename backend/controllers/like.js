import jwt from 'jsonwebtoken';
import { db } from '../connectionDB.js';
import { sqlCreateLikeArticle} from '../utils/scriptSQL.js';

export const createLikeArticle = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    const userId = decodedToken.userId;
    console.log(req.body.articleId);
    const likeArticleData = [
        userId,
        req.body.articleId
    ]

    db.query(
        sqlCreateLikeArticle,
        likeArticleData,
        (err, result) => {
            if (err) throw err;
            console.log(result);
            res.status(200).json({ message: "Like ajouté!" })
        })
}
