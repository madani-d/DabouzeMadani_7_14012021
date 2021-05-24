export const sqlCheckEmail = "SELECT COUNT(*) as present FROM User WHERE email = ?";

export const sqlSignin = "INSERT INTO User " +
                        "(nom, prenom, email, role, date_signin, mdp)" +
                        "VALUES ( ?, ?, ?, 'U', ?, ?);";

export const sqllogin = "SELECT mdp, id FROM User " +
                        "WHERE email = ? ;";

export const sqlCreateArticle = "INSERT INTO Article " +
                        "(user_id, image_url, texte_article, date_post) " +
                        "VALUES (?, ?, ?, ?)";

export const sqlGetAllArticle = "select Article.id, Article.user_id, Article.image_url, " +
                                "Article.texte_article, Article.date_post, " +
                                "count(Likepost.article_id) as likepost, User.avatar, User.nom, User.prenom " + 
                                "from Article " +
                                "left join Likepost " +
                                "on Article.id = Likepost.article_id " +
                                "inner join User " +
                                "on Article.user_id = User.id " +
                                "group by Article.id order by date_post desc;";