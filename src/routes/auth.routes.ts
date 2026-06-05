import { Router } from "express";
import { login, logout } from "../controllers/auth.controller";

const router = Router();

//  Auth
router.post("/login", login);
router.get("/login", (req, res) => {});
router.post("/logout", logout);

export default router;
