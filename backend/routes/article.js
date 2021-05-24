import { Router } from 'express';
const router = Router();
import multer from '../middleware/multer-config.js'
import { createArticle, getAllArticle } from '../controllers/article.js';



router.post('/article', multer, createArticle);
router.get('/getall', getAllArticle);


export default router;