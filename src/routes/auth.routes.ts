import { Router } from "express"
import { login, logout } from "../controllers/auth.controller";

const router = Router()

//  Auth
router.post('/login', login)
router.get('/login', (req, res)=>{
    return res.json({
        message: 'ini halaman login'
    })
})
router.post('/logout', logout)

export default router