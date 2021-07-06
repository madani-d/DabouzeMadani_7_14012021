// Connexion
export const sqlCheckEmail = `
    SELECT COUNT(*) AS present  
    FROM User WHERE email = ?;
`
export const sqlSignin = `
    INSERT INTO User  
    (nom, prenom, email, role, date_signin, mdp, uuid) 
    VALUES ( ?, ?, ?, 'U', ?, ?, ?);`

export const sqllogin = `
    SELECT mdp, id, role, uuid 
    FROM User  
    WHERE email = ?;`

export const sqlAuthToken = `
    SELECT uuid FROM User 
    WHERE id = ?;
`

// Articles
export const sqlCreateArticle = `
CALL create_article (?, ?, ?, ?);`

export const sqlGetArticles = `
    SELECT Article.id, Article.user_id, Article.image_url, 
    Article.texte_article, Article.date_post,
    (SELECT COUNT(*) FROM Likepost WHERE Article.id = Likepost.article_id) AS articleLikes,
    (SELECT COUNT(*) FROM Likepost WHERE Article.id = Likepost.article_id AND Likepost.user_id = ?) AS liked,
    User.avatar, User.nom, User.prenom, 
    Commentaire.id as commentId, Commentaire.texte_commentaire, 
    Commentaire.date_post as commentDatePost, Commentaire.user_id as commentaireUserId, 
    (SELECT COUNT(*) FROM Likepost WHERE Commentaire.id = Likepost.commentaire_id) AS commentLikes,
    (SELECT User.avatar FROM User 
        WHERE Commentaire.user_id = User.id AND Article.id = Commentaire.article_id) AS commentAvatar,
    (SELECT User.id FROM User 
        WHERE Commentaire.user_id = User.id AND Article.id = Commentaire.article_id) AS commentUserId,
    (SELECT User.nom FROM User 
        WHERE Commentaire.user_id = User.id AND Article.id = Commentaire.article_id) AS commentUserNom,
    (SELECT User.prenom FROM User 
        WHERE Commentaire.user_id = User.id AND Article.id = Commentaire.article_id) AS commentUserPrenom,
    (SELECT COUNT(*) FROM Likepost WHERE Commentaire.id = Likepost.commentaire_id AND Likepost.user_id = ?) AS commentLiked
    FROM Article 
    LEFT JOIN User ON Article.user_id = User.id 
    LEFT JOIN Commentaire ON Article.id = Commentaire.article_id 
    ORDER BY Article.id DESC;
`

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
    CALL update_article (?, ?, ?, ?);`

export const sqlUpdateArticleText = `
        UPDATE Article
        SET texte_article = ?
        WHERE id = ?
        AND user_id = ?;
`

// Comments

export const sqlCreateComment = `
    CALL create_commentaire (?, ?, ?, ?);`

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

export const sqlUpdateAvatar = `
    CALL update_avatar(?, ?);
`

// Report

export const sqlReportArticle = `
    INSERT INTO Report  
    (user_id, article_id)  
    VALUES (?, ?);`

export const sqlCheckArticleReported = `
    SELECT * FROM Report
    WHERE user_id = ?
    AND article_id = ?;
`

export const sqlReportComment = `
    INSERT INTO Report  
    (user_id, commentaire_id)  
    VALUES (?, ?);`

export const sqlCheckCommentReported = `
    SELECT * FROM Report
    WHERE user_id = ?
    AND commentaire_id = ?;
`


// Moderator

export const sqlGetReports = `
    CALL get_reports();
`

export const sqlModoAuth = `
    SELECT role FROM User
    WHERE id = ?;
`

export const sqlDeleteReportedArticle = `
    CALL delete_reported_Article(?);
`

export const sqlDeleteReportedComment = `
    DELETE FROM Commentaire
    WHERE id = ?;
`

// Chat

export const sqlLoadChat = `
    SELECT user_id, texte_chat, Chat.date_post,
    prenom, nom, avatar
    FROM Chat
    INNER JOIN User
    ON Chat.user_id = User.id;
`

export const sqlInsertMessageChat = `
    INSERT INTO Chat (user_id, texte_chat, date_post)
    VALUES (?, ?, ?);
`

export const sqlChatUserData = `
    SELECT prenom, nom, avatar FROM User
    WHERE id = ?;
`