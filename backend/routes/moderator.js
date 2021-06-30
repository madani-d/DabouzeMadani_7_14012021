import { Router } from "express";
const router = Router();
import multer from '../middleware/multer-config.js';
import { auth } from '../middleware/auth.js';
import { deleteReportedArticle, getReports } from "../controllers/moderator.js";
import { deleteArticle } from "../controllers/article.js";
import { modo } from '../middleware/modo.js';


router.get('/getReports', auth, modo, getReports);
router.delete('/deleteArticle', auth, modo, multer, deleteReportedArticle)

export default router;