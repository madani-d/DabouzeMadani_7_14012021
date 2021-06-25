import { Router } from 'express';
const router = Router();
import multer from '../middleware/multer-config.js';
import { auth } from '../middleware/auth.js';
import {
    createComment,
    deleteComment,
    updateComment,
    reportComment
} from '../controllers/comment.js';

router.post('/', auth, multer, createComment);
router.delete('/delete', auth, deleteComment);
router.put('/update', auth, updateComment);
router.post('/report', auth, reportComment);


export default router;