import { Router } from 'express';
const router = Router();
import multer from '../middleware/multer-config.js'
import { createArticle, getAllArticle } from '../controllers/article.js';
import { auth } from '../middleware/auth.js'


router.post('/article', auth, multer, createArticle);
router.get('/getall', auth, getAllArticle);



export default router;