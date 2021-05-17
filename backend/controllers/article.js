const db = require('../connectionDB');

const dateJsToSql = () => {// Convert Date to DATETIME SQL
    const date = new Date()
    return date.getUTCFullYear() + '-' +
    ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' +
    ('00' + date.getHours()).slice(-2) + ':' +
    ('00' + date.getMinutes()).slice(-2) + ':' +
    ('00' + date.getSeconds()).slice(-2);
}

exports.createArticle = (req, res, next) => {
    let article = [
        req.body.user_id,
        req.body.image_url,
        req.body.texte_article,
        dateJsToSql(),
    ]
    console.log(req.body);
    console.log(article);

    const sql = "INSERT INTO Article " +
                "(user_id, image_url, texte_article, date_post) " +
                "VALUES (?, ?, ?, ?)";
    db.query(sql, article, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ message: "Article publié avec succés !" })
    })

}

exports.getAllArticle = (req, res, next) => {
    let sql = "SELECT * FROM User;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({result});
        next();
    })
};