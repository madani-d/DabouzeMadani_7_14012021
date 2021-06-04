import { Router } from 'express';
const router = Router();
import { auth } from '../middleware/auth.js';
import {
    createLikeArticle,
    removeLikeArticle,
    createLikeComment,
    removeLikeComment
} from '../controllers/like.js';

router.post('/article/likeArticle', auth, createLikeArticle);
router.post('/article/unlikeArticle', auth, removeLikeArticle);
router.post('/article/likeComment', auth, createLikeComment);
router.post('/article/unlikeComment', auth, removeLikeComment);



export default router;