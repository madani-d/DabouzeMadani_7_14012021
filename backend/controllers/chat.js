import { db } from "../connectionDB.js";
import dateJsToSql from "../utils/date.js";
import { sqlLoadChat } from "../utils/scriptSQL.js";

export const loadChat = (req, res) => {
    console.log('charge');
    db.query(sqlLoadChat,
        (err, result) => {
            if (err) throw err;
            console.log(result);
            const data = []
            for (const row of result) {
                const message = {
                    datePost: row.date_post,
                    message: row.texte_chat,
                    user: {
                        prenom: row.prenom,
                        nom: row.nom,
                        avatar: row.avatar
                    }
                }
                data.push(message)
            }
            res.status(200).json(data)
        }
    )
}