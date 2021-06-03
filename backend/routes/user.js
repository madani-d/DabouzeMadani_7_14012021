import { Router } from 'express';
const router = Router();
import { auth } from '../middleware/auth.js'
import { signin, login, restoreConnection } from '../controllers/user.js';

router.post('/signin', signin);
router.post('/login', login);
router.get('/restoreConnection', auth, restoreConnection);


export default router;