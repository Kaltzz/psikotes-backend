import { getUsername } from "../models/auth.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

export const loginService= async (dataLogin: any, res:any) => {
    const InputPassword = dataLogin.password
    const InputUsername = dataLogin.username
    const dataAdmin = await getUsername(InputUsername)

    if(!dataAdmin) {
        return {
            success: false,
            message: 'Username/Password Salah'
        }
    }
    if(dataAdmin != null) {
        const hashedPassword = dataAdmin.password
        // bcrypt.compare(InputPassword, hashedPassword)
        try {
            const match =  await bcrypt.compare(InputPassword, hashedPassword)
            if (match) {
                const payload = {
                    id: dataAdmin.id,
                    username: dataAdmin.username
                }
                const secret = process.env.ACCESS_TOKEN_SECRET!
                const token = jwt.sign(
                    payload, secret, {      
                        expiresIn: '15m'
                    }
                )

                res.cookie('access_token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 15 * 60 * 1000, //15 menit
                    sameSite: 'none'
                })

                return ({
                    success: true,
                    message: 'Login Berhasil',
                    data: {
                        id: dataAdmin.id,
                        username: dataAdmin.username
                    }
                })
            } else {
                return({
                    success: false,
                    message: 'Password/Username Salah'
                })
            }

        } catch(err) {
            return ({
                success: false,
                message: 'Login gagal'
            })
        }
    }
}