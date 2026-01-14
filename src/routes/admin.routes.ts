import { Router } from "express";
import { addToken, deleteToken, getToken, spesificToken } from "../controllers/token.controller";


const router = Router()

//  Token
router.get('/token', getToken)
router.post('/token', addToken)
router.get('/token/:id', spesificToken)
router.delete('/token/:id', deleteToken)

export default router