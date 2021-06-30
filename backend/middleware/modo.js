import { db } from "../connectionDB.js";
import { sqlModoAuth } from "../utils/scriptSQL.js";

export const modo = (req, res, next) => {
    console.log('modo');
    db.query(sqlModoAuth,
        res.locals.userId,
        (err, result) => {
            if (err) throw err;
            console.log(result[0].role);
            if (result[0].role === 'M') {
                next()
            } else {
                res.status(403).json({ message: "Accès refusé" })
            }
    })
}