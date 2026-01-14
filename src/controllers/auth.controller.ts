import { successResponse } from "../utils/tests.utils";
import { checkLogin } from "../services/auth.service";
import cookieParser from "cookie-parser"

export const login = async (req:any, res:any) =>{
    const getLogin = await checkLogin(req.body, res)
    
    if (getLogin == undefined) {
        return
    }
    
    const status = getLogin.success ? 200 : 401

    return res.status(status).json({
        success: getLogin.success,
        message: getLogin.message,
        data: getLogin?.data,
    })  
}

export const logout = async (req:any, res:any) => {
        res.clearCookie('access_token', {
                    httpOnly: true,
                    secure: process.env.ACCESS_TOKEN_SECRET,
                    maxAge: 2 * 60 * 1000, //15 menit
                    sameSite: 'strict'
                })
    return (
        res.redirect('http://localhost:4000/api/admin/login')
    )
}