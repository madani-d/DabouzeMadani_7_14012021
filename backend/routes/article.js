const express = require('express');
const router = express.Router();
const db = require('../connectionDB');

const articleCtrl = require('../controllers/article');

// router.post('/article', articleCtrl.createArticle);
// router.get('/', articleCtrl.getAllArticle);
// router.patch('/:id');
// router.delete('/:id');

router.get('/getall', (req, res, next) => {
    let sql = "SELECT * FROM Article;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("essai", result);
        res.send({result});
        next();
    })
});

module.exports = router;