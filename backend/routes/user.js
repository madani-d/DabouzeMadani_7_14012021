import { Router } from 'express';
const router = Router();

import { signin, login } from '../controllers/user.js';

router.post('/signin', signin);
router.post('/login', login);


export default router;