import { Router } from "express";
import adminRoutes from "./admin.routes"
import authRoutes from "./auth.routes"
import pesertaRoutes from "./peserta.routes"
import n8nRoutes from "./n8n.routes"
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.use('/admin', authMiddleware, adminRoutes)
router.use('/auth', authRoutes)
router.use('/user', pesertaRoutes)

router.use('/n8n', n8nRoutes)

router.use('/test', ()=> {
    console.log("Server running")
})

export default router