import { Router } from 'express';
const router = Router();
import { auth } from '../middleware/auth.js';
import multer from '../middleware/multer-config.js';
import {
    signin,
    login,
    restoreConnection,
    getAllUsers,
    updateAvatar
} from '../controllers/user.js';

router.post('/signin', signin);
router.post('/login', login);
router.get('/restoreConnection', auth, restoreConnection);
router.get('/getUsers', auth, getAllUsers);
router.put('/updateAvatar', auth, multer, updateAvatar)


export default router;