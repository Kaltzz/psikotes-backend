import { Router } from "express";
import { 
    triggerN8N,
    n8nCfit, 
    n8nKraepelin,
    n8nDisc,
    n8nPapikostik
 } from "../controllers/n8n.controller";

const router = Router()


router.post('/trigger/:pesertaId', triggerN8N)
router.get('/cfit/:pesertaId', n8nCfit)
router.get('/kraepelin/:pesertaId', n8nKraepelin)
router.get('/disc/:pesertaId', n8nDisc)
router.get('/papikostick/:pesertaId', n8nPapikostik)

export default router