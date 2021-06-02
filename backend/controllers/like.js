import { db } from '../connectionDB.js';
import { sqlCreateLikeArticle} from '../utils/scriptSQL.js';

export const createLikeArticle = (req, res, next) => {
    console.log(req.body);
    const likeArticleData = [
        req.body.userId,
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
