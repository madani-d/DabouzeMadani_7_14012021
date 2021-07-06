import { db } from "../connectionDB.js";
import jwt from "jsonwebtoken";
import { sqlAuthToken } from "../utils/scriptSQL.js";

export const auth = (req, res, next) => {
    try {
        db.query(sqlAuthToken,
            [req.query.ID],
            (err, result) => {
                if (err) throw err;
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
                if (decodedToken.userUuid === result[0].uuid) {
                    res.locals.userId = req.query.ID
                    next()
                } else {
                    res.status(401).json({ message: "probléme d'identification" })
                }
            }
        )
    } catch (error) { res.status(401).json({ error }) }
};