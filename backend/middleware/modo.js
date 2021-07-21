import { db } from "../connectionDB.js";
import { sqlModoAuth } from "../utils/scriptSQL.js";

export const modo = (req, res, next) => {
    // Check if user is Modo
    db.query(sqlModoAuth,
        res.locals.userId,
        (err, result) => {
            if (err) throw err;
            if (result[0].role === 'M') {
                next()
            } else {
                res.status(403).json({ message: "Accès refusé" })
            }
    })
}