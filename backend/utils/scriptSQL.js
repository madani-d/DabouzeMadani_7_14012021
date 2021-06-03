// Connexion
export const sqlCheckEmail =    "SELECT COUNT(*) AS present " +
                                "FROM User WHERE email = ?;";

export const sqlSignin =    "INSERT INTO User " +
                            "(nom, prenom, email, role, date_signin, mdp)" +
                            "VALUES ( ?, ?, ?, 'U', ?, ?);";

export const sqllogin = "SELECT mdp, id " +
                        "FROM User " +
                        "WHERE email = ? ;";

// Articles
export const sqlCreateArticle = "INSERT INTO Article " +
                                "(user_id, image_url, texte_article, date_post) " +
                                "VALUES (?, ?, ?, ?);";

export const sqlGetAllArticle = "SELECT Article.id, Article.user_id, Article.image_url, " +
                                "Article.texte_article, Article.date_post, " +
                                "count(Likepost.article_id) AS likepost, User.avatar, User.nom, User.prenom " + 
                                "FROM Article " +
                                "LEFT JOIN Likepost " +
                                "ON Article.id = Likepost.article_id " +
                                "INNER JOIN User " +
                                "ON Article.user_id = User.id " +
                                "GROUP BY Article.id ORDER BY date_post DESC;";

// Comments
export const sqlCreateComment = "INSERT INTO Commentaire " +
                                "(user_id, article_id, texte_commentaire, date_post) " +
                                "VALUES (?, ?, ?, ?);";

export const sqlGetComment =    "SELECT User.avatar, User.nom, User.prenom, " + 
                                "Commentaire.id, Commentaire.image_url,Commentaire.texte_commentaire, Commentaire.user_id " +
                                "FROM Commentaire " +
                                "INNER JOIN User " +
                                "ON Commentaire.user_id = User.id " +
                                "WHERE Commentaire.article_id = ? ;";

//LikePost
export const sqlCreateLikeArticle = "INSERT INTO Likepost" +
                                    "(user_id, article_id)" +
                                    "VALUES (?, ?);";

export const sqlGetLikedPost = "SELECT COUNT(*) AS postLiked " +
                            "FROM Likepost " +
                            "WHERE user_id = ? " + 
                            "AND article_id = ? ;";