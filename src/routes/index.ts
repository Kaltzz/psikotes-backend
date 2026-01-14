import { Router } from "express";
import testRoutes from "./tests.routes"
import adminRoutes from "./admin.routes"
import authRoutes from "./auth.routes"
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.use('/test', authMiddleware, testRoutes)
router.use('/admin', adminRoutes)
router.use('/auth', authRoutes)
// router.use('/questions', )

// router.use('/')

export default router