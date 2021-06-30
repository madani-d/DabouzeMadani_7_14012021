import { Router } from 'express';
const router = Router();
import multer from '../middleware/multer-config.js'
import { auth } from '../middleware/auth.js'
import {
    createArticle,
    deleteArticle,
    updateArticle,
    updateArticleText,
    reportArticle,
    getArticles
} from '../controllers/article.js';


router.post('/article', auth, multer, createArticle);
router.get('/getall', auth, getArticles);
router.delete('/delete', auth, deleteArticle);
router.put('/updateArticle', multer, auth, updateArticle);
router.put('/updateText', auth, updateArticleText);
router.post('/report', auth, reportArticle);



export default router;