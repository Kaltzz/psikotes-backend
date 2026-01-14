import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const authMiddleware = (req: any, res: any, next:NextFunction) => {
    
    const cookie = req.headers.cookie

    if(!cookie) {
        return res.status(403).json({
            message: 'Unauthorized. No token provided.'
        })    
    }

    try {
        const splittedCookie:string = cookie.split(/(=)/)[2]??""
        const decoded = jwt.verify(splittedCookie, process.env.ACCESS_TOKEN_SECRET!)
        req.user = decoded
        next()

    } catch (err) {
        return (
        //     res.status(403).json({
        //     message: 'Invalid token'
        // })
        res.redirect(301, 'http://localhost:4000/api/admin/login')
        )
    }
}