import { Router } from "express";
import { loadChat } from "../controllers/chat.js";
const router = Router();
import { auth } from "../middleware/auth.js";


router.get('/loadMessages', auth, loadChat);

export default router;