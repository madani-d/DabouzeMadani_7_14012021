DROP DATABASE IF EXISTS groupomania;
DROP TABLE IF EXISTS Article;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Commentaire;
DROP TABLE IF EXISTS Likepost;
DROP TABLE IF EXISTS Report;
DROP TABLE IF EXISTS Chat;

CREATE DATABASE groupomania CHARACTER SET 'utf8';

CREATE TABLE Article (
    id smallint unsigned NOT NULL AUTO_INCREMENT,
    user_id smallint unsigned NOT NULL,
    image_url varchar(100) DEFAULT NULL,
    texte_article text,
    date_post datetime NOT NULL,
    PRIMARY KEY (id),
    KEY fk_article_userid (user_id),
    CONSTRAINT fk_article_userid FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE User (
    id smallint unsigned NOT NULL AUTO_INCREMENT,
    nom varchar(30) NOT NULL,
    prenom varchar(30) NOT NULL,
    email varchar(70) NOT NULL,
    role char(1) NOT NULL,
    date_signin datetime NOT NULL,
    mdp varchar(70) NOT NULL,
    avatar varchar(100) DEFAULT 'http://localhost:5000/images/defaultAvatar.png',
    uuid varchar(36) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE Commentaire (
    id smallint unsigned NOT NULL AUTO_INCREMENT,
    user_id smallint unsigned NOT NULL,
    article_id smallint unsigned NOT NULL,
    date_post datetime NOT NULL,
    texte_commentaire text,
    image_url varchar(100) DEFAULT NULL,
    PRIMARY KEY (id),
    KEY fk_commentaire_userid (user_id),
    KEY fk_commentaire_articleid (article_id),
    CONSTRAINT fk_commentaire_articleid FOREIGN KEY (article_id) REFERENCES Article (id) ON DELETE CASCADE,
    CONSTRAINT fk_commentaire_userid FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Likepost (
    id smallint unsigned NOT NULL AUTO_INCREMENT,
    user_id smallint unsigned NOT NULL,
    article_id smallint unsigned DEFAULT NULL,
    commentaire_id smallint unsigned DEFAULT NULL,
    PRIMARY KEY (id),
    KEY fk_like_articleid (article_id),
    KEY fk_like_userid (user_id),
    KEY fk_like_commentaireid (commentaire_id),
    CONSTRAINT fk_like_articleid FOREIGN KEY (article_id) REFERENCES Article (id) ON DELETE CASCADE,
    CONSTRAINT fk_like_commentaireid FOREIGN KEY (commentaire_id) REFERENCES Commentaire (id) ON DELETE CASCADE,
    CONSTRAINT fk_like_userid FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Report (
    id smallint unsigned NOT NULL AUTO_INCREMENT,
    user_id smallint unsigned NOT NULL,
    article_id smallint unsigned DEFAULT NULL,
    commentaire_id smallint unsigned DEFAULT NULL,
    PRIMARY KEY (id),
    KEY fk_report_userid (user_id),
    KEY fk_report_articleid (article_id),
    KEY fk_report_commentaireid (commentaire_id),
    CONSTRAINT fk_report_articleid FOREIGN KEY (article_id) REFERENCES Article (id) ON DELETE CASCADE,
    CONSTRAINT fk_report_commentaireid FOREIGN KEY (commentaire_id) REFERENCES Commentaire (id) ON DELETE CASCADE,
    CONSTRAINT fk_report_userid FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Chat (
    id smallint unsigned NOT NULL AUTO_INCREMENT,
    user_id smallint unsigned NOT NULL,
    texte_chat text NOT NULL,
    date_post datetime NOT NULL,
    PRIMARY KEY (id),
    KEY fk_chat_user_id (user_id),
    CONSTRAINT fk_chat_user_id FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE
) ENGINE=InnoDB;

DROP PROCEDURE IF EXISTS create_article;
CREATE DEFINER=`betatesteur`@`localhost` PROCEDURE `create_article`(p_user_id smallint, p_image_url varchar(100), p_texte_article text, p_date_post datetime)
begin
insert into Article (user_id, image_url, texte_article, date_post)
values (p_user_id, p_image_url, p_texte_article, p_date_post);
select Article.id, Article.user_id, Article.image_url, Article.texte_article, Article.date_post, User.avatar, User.nom, User.prenom
from Article
inner join User
on Article.user_id = User.id
where Article.user_id = p_user_id and 
Article.date_post = p_date_post ;
end

DROP PROCEDURE IF EXISTS create_commentaire;
CREATE DEFINER=`betatesteur`@`localhost` PROCEDURE `create_commentaire`(p_user_id smallint, p_article_id smallint, p_date_post datetime, p_texte_commentaire text)
begin  insert into Commentaire (user_id, article_id, date_post, texte_commentaire) values (p_user_id, p_article_id, p_date_post, p_texte_commentaire); select Commentaire.id, Commentaire.date_post, User.avatar, User.prenom, User.nom from Commentaire inner join User on User.id = Commentaire.user_id where user_id = p_user_id and article_id = p_article_id and  date_post = p_date_post and texte_commentaire = p_texte_commentaire ; end

DROP PROCEDURE IF EXISTS delete_account;
CREATE DEFINER=`betatesteur`@`localhost` PROCEDURE `delete_account`(p_user_id smallint)
begin
select avatar from User where id = p_user_id;
select image_url from Article where user_id = p_user_id;
delete from User where id = p_user_id;
end

DROP PROCEDURE IF EXISTS delete_reported_article;
CREATE DEFINER=`betatesteur`@`localhost` PROCEDURE `delete_reported_article`(p_article_id smallint)
begin select image_url from Article where id = p_article_id;
delete from Article where id = p_article_id;
end

DROP PROCEDURE IF EXISTS get_reports;
CREATE DEFINER=`betatesteur`@`localhost` PROCEDURE `get_reports`()
begin select Article.id, Article.texte_article, Article.image_url, Article.user_id, User.avatar, User.prenom, User.nom from Article inner join User on User.id = Article.user_id inner join Report on Article.id = Report.article_id; select Commentaire.id, Commentaire.texte_commentaire, Commentaire.user_id, User.avatar, User.prenom, User.nom from Commentaire inner join User on User.id = Commentaire.user_id inner join Report on Commentaire.id = Report.commentaire_id; end

DROP PROCEDURE IF EXISTS update_article;
CREATE DEFINER=`betatesteur`@`localhost` PROCEDURE `update_article`(p_image_url varchar(100), p_texte_article text, p_article_id smallint, p_user_id smallint)
begin
select image_url from Article where id = p_article_id and user_id = p_user_id;
update Article set image_url = p_image_url, texte_article = p_texte_article where id = p_article_id and user_id = p_user_id;
select image_url from Article where id = p_article_id and user_id = p_user_id;
end

DROP PROCEDURE IF EXISTS update_avatar;
CREATE DEFINER=`betatesteur`@`localhost` PROCEDURE `update_avatar`(p_user_id smallint, p_avatar varchar(100))
begin
select avatar from User where id = p_user_id;
update User set avatar = p_avatar where id = p_user_id;
select avatar from User where id = p_user_id;
end