import { Response } from "../utils/response";
import jwt from "jsonwebtoken"
import "dotenv/config"

const {JWT_SECRET} = process.env

export const loginRequired = (req, res, next) => {
    try {
        let token = null
        if(req.headers.authorization)
        {
            const [leftPart, rightPart] = req.headers.authorization.split(" ")
            if(leftPart == "Bearer") {
                token = rightPart
            }
        } else {
                token = req.headers.token || req.query.token || req.body.token
        }
         
        if(!token) return res.status(403).json(new Response("Unauthorized", "Token is required", false))

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json(new Response("Unauthorized user", err, false))
            }
            if(decoded) next()
        });
    } catch(err) {
        return res.status(401).json(new Response("Unauthorized user", err, false))
    }
}
