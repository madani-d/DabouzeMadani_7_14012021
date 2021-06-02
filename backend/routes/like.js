import { Router } from 'express';
const router = Router();
import multer from '../middleware/multer-config.js';
import { auth } from '../middleware/auth.js';
import { createLikeArticle } from '../controllers/like.js';

router.post('/article/like', auth, createLikeArticle);



export default router;