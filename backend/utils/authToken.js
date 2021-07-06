import { db } from "../connectionDB.js";
import jwt from "jsonwebtoken";
import { sqlAuthToken } from "./scriptSQL.js";

export const authToken = (token, id, res, next) => {
    db.query(sqlAuthToken,
        [id],
        (err, result) => {
            if (err) throw err;
            // console.log(result);
            // console.log(result[0]);
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
            // console.log(decodedToken.userId);
            if (decodedToken.userId === result[0].id) {
                res.locals.userId = result[0].id
                next()
            } else {
                result.status(401).json({ error: "User ID non valable" })
            }
        }
    )
}