import { Router } from 'express';
const router = Router();
import { auth } from '../middleware/auth.js';
import {
    createLikeArticle,
    removeLikeArticle,
    createLikeComment,
    removeLikeComment
} from '../controllers/like.js';

router.post('/likeArticle', auth, createLikeArticle);
router.post('/unlikeArticle', auth, removeLikeArticle);
router.post('/likeComment', auth, createLikeComment);
router.post('/unlikeComment', auth, removeLikeComment);



export default router;