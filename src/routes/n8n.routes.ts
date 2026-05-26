import { Router } from "express";
import { 
    triggerN8N,
    n8nCfit, 
    n8nKraepelin,
    n8nDisc,
    n8nPapikostik,
    n8nMsdt,
    n8nMbti,
    getAllCfitAnswers,
    getAllKraepelinAnswers,
    getAllDiscAnswers,
    getAllPapikostickAnswers,
    getAllMsdtAnswers,
    getAllMbtiAnswers,
    postPapikostickScoring,
    postDiscScoring,
    postMsdtScoring
 } from "../controllers/n8n.controller";

const router = Router()


router.post('/trigger/:pesertaId', triggerN8N)

router.get('/cfit/:pesertaId', n8nCfit)
router.get('/cfit', getAllCfitAnswers)

router.get('/kraepelin/:pesertaId', n8nKraepelin)
router.get('/kraepelin', getAllKraepelinAnswers)

router.get('/disc/:pesertaId', n8nDisc)
router.get('/disc', getAllDiscAnswers)
router.post('/disc', postDiscScoring)

router.get('/papikostick/:pesertaId', n8nPapikostik)
router.get('/papikostick', getAllPapikostickAnswers)
router.post('/papikostick', postPapikostickScoring)

router.get('/msdt/:pesertaId', n8nMsdt)
router.get('/msdt', getAllMsdtAnswers)
router.post('/msdt', postMsdtScoring)

router.get('/mbti/:pesertaId', n8nMbti)
router.get('/mbti', getAllMbtiAnswers)



export default router