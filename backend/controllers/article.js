const db = require('../connectionDB');

exports.getAllArticle = (req, res, next) => {
    let sql = "SELECT * FROM User;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({result});
        next();
    })
};