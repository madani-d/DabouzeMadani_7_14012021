import { Router } from 'express';
const router = Router();
import multer from '../middleware/multer-config.js';
import { createComment } from '../controllers/comment.js';
import { auth } from '../middleware/auth.js';

router.post('/comment', auth, multer, createComment);


export default router;