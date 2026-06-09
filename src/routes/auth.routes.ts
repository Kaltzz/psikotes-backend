import { Router } from "express";
import { login, logout, refreshToken } from "../controllers/auth.controller";

const router = Router();

//  Auth
router.post("/login", login);
router.post("/refreshtoken", refreshToken);
router.get("/login", (req, res) => {});
router.post("/logout", logout);

export default router;
