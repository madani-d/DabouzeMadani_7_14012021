import { Router } from 'express';
const router = Router();
import { auth } from '../middleware/auth.js';
import multer from '../middleware/multer-config.js';
import {
    signin,
    login,
    restoreConnection,
    getAllUsers,
    updateAvatar,
    deleteAccount
} from '../controllers/user.js';
import { check, validationResult } from 'express-validator';

router.post('/signin', [
    check('email', 'Veuillez entrer une adresse email valide')
        .isEmail(),
    check('email', 'Entre 6 et 254 caractères pour votre mail')
        .isLength({ max: 254, min: 6 }),
    check('password', 'Votre mot de passe doit contenir entre 8 et 15 caractéres dont un minuscule, une majuscule et un chiffre')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,15})$/),
    check('nom', 'Veuillez ne pas utiliser de chiffre ou de caractéres speciaux dans le nom')
        .matches(/^[a-zA-Z]+$/),
    check('nom', 'Entre 1 et 30 caractères pour votre nom')
        .isLength({ max: 30, min: 1 }),
    check('prenom', 'Veuillez ne pas utiliser de chiffre ou de caractéres speciaux dans le prenom')
        .matches(/^[a-zA-Z]+$/),
    check('prenom', 'Entre 1 et 30 caractères pour votre prenom')
        .isLength({ max: 30, min: 1 })
], signin);
router.post('/login', login);
router.get('/restoreConnection', auth, restoreConnection);
router.get('/getUsers', auth, getAllUsers);
router.put('/updateAvatar', auth, multer, updateAvatar);
router.get('/deleteAccount', auth, deleteAccount);


export default router;