const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');

router.post('/');
router.get('/', articleCtrl.getAllArticle);
router.patch('/:id');
router.delete('/:id');

module.exports = router;