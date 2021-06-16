// Connexion
export const sqlCheckEmail = `
    SELECT COUNT(*) AS present  
    FROM User WHERE email = ?;
`

export const sqlSignin = `
    INSERT INTO User  
    (nom, prenom, email, role, date_signin, mdp) 
    VALUES ( ?, ?, ?, 'U', ?, ?);`

export const sqllogin = `
    SELECT mdp, id  
    FROM User  
    WHERE email = ?;`

// Articles
export const sqlCreateArticle = `
    INSERT INTO Article  
    (user_id, image_url, texte_article, date_post)  
    VALUES (?, ?, ?, ?);`

export const sqlGetAllArticle = `
    SELECT Article.id, Article.user_id, Article.image_url,  
    Article.texte_article, Article.date_post,  
    COUNT(Likepost.article_id) AS articleLikes, User.avatar, User.nom, User.prenom   
    FROM Article  
    LEFT JOIN Likepost  
    ON Article.id = Likepost.article_id  
    INNER JOIN User  
    ON Article.user_id = User.id  
    GROUP BY Article.id ORDER BY date_post DESC;`

export const sqlGetDeleteFilename = `
    SELECT image_url FROM Article  
    WHERE id = ?  
    AND user_id = ?;`

export const sqlDeleteArticle = `
    DELETE FROM Article  
    WHERE id = ?  
    AND user_id = ?;`

export const sqlUpdateArticle = `
    UPDATE Article  
    SET texte_article = ?  
    WHERE id = ?  
    AND user_id = ?;`

export const sqlReportArticle = `
    INSERT INTO Report  
    (user_id, article_id)  
    VALUES (?, ?);`


// Comments
export const sqlCreateComment = `
    INSERT INTO Commentaire  
    (user_id, article_id, texte_commentaire, date_post)  
    VALUES (?, ?, ?, ?);`

export const sqlGetComment = `
    SELECT User.avatar, User.nom, User.prenom,   
    Commentaire.id, Commentaire.image_url,Commentaire.texte_commentaire, Commentaire.user_id,  
    COUNT(Likepost.commentaire_id) AS commentLikes  
    FROM Commentaire  
    LEFT JOIN Likepost  
    ON Commentaire.id = Likepost.commentaire_id  
    INNER JOIN User  
    ON Commentaire.user_id = User.id  
    WHERE Commentaire.article_id = ?  
    GROUP BY Commentaire.id;`

    export const sqlDeleteComment = `
    DELETE FROM Commentaire  
    WHERE id = ?  
    AND user_id = ?;`

export const sqlUpdateComment = `
    UPDATE Commentaire  
    SET texte_commentaire = ?  
    WHERE id = ?  
    AND user_id = ?;`

export const sqlReportComment = `
    INSERT INTO Report  
    (user_id, commentaire_id)  
    VALUES (?, ?);`

//LikePost Articles
export const sqlLikeArticle = `
    INSERT INTO Likepost 
    (user_id, article_id) 
    VALUES (?, ?);`

export const sqlRemoveLikedArticle = `
    DELETE FROM Likepost  
    WHERE user_id = ?  
    AND article_id = ? ;`

export const sqlGetLikedArticle = `
    SELECT COUNT(*) AS articleLiked  
    FROM Likepost  
    WHERE user_id = ?   
    AND article_id = ? ;`

//LikePost Comments

export const sqlLikeComments = `
    INSERT INTO Likepost 
    (user_id, commentaire_id) 
    VALUES (?, ?);`

export const sqlRemoveLikedComment = `
    DELETE FROM Likepost  
    WHERE user_id = ?  
    AND commentaire_id = ? ;`

export const sqlGetLikedComment = `
    SELECT COUNT(*) AS liked  
    FROM Likepost  
    WHERE user_id = ?   
    AND commentaire_id = ? ;`

// Users

export const sqlGetAllUsers = `
    SELECT id, prenom, nom, avatar, date_signin  
    FROM User  
    ORDER BY date_signin DESC;`