import { Router } from "express";
const router = Router();
import multer from '../middleware/multer-config.js';
import { auth } from '../middleware/auth.js';
import { deleteReportedArticle, deleteReportedComment, getReports } from "../controllers/moderator.js";
import { modo } from '../middleware/modo.js';


router.get('/getReports', auth, modo, getReports);
router.delete('/deleteArticle', auth, modo, multer, deleteReportedArticle);
router.delete('/deleteComment', auth, modo, deleteReportedComment);

export default router;