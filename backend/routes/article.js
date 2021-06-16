import { Router } from 'express';
const router = Router();
import multer from '../middleware/multer-config.js'
import { auth } from '../middleware/auth.js'
import {
    createArticle,
    getAllArticle,
    deleteArticle,
    updateArticle,
    reportArticle
} from '../controllers/article.js';


router.post('/article', auth, multer, createArticle);
router.get('/getall', auth, getAllArticle);
router.delete('/delete', auth, deleteArticle);
router.put('/update', auth, updateArticle);
router.post('/report', auth, reportArticle);



export default router;