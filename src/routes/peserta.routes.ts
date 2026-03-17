import { Router } from "express";
import { postPeserta, statusPeserta} from "../controllers/peserta.controller";
import { 
    answersCfit, 
    answersDisc, 
    answersKraepelin,
    answersPapikostick,
    n8nAnswersKraepelin
} from "../controllers/answers.controller"

import {
    getCfit1QuestionsContoh, 
    getCfit1QuestionsSoal,
    getCfit2QuestionsContoh,
    getCfit2QuestionsSoal,
    getCfit3QuestionsContoh,
    getCfit3QuestionsSoal,
    getCfit4QuestionsContoh,
    getCfit4QuestionsSoal,
    getDiscQuestions,
    getPapikostikQuestions
} from "../controllers/questions.controller"

const router = Router()

router.post('/peserta', postPeserta)
router.put('/peserta/status/:id', statusPeserta)

//jawaban
router.post('/answers/cfit/:id', answersCfit)
router.post('/answers/disc/:id', answersDisc)
router.post('/answers/kraepelin/:id', answersKraepelin)
router.post('/answers/papikostik/:id', answersPapikostick)
router.post('/answers/n8nKraepelin', n8nAnswersKraepelin)

//pertanyaan
//CFIT
router.get('/questions/cfit1/contoh', getCfit1QuestionsContoh)
router.get('/questions/cfit1/soal', getCfit1QuestionsSoal)
router.get('/questions/cfit2/contoh', getCfit2QuestionsContoh)
router.get('/questions/cfit2/soal', getCfit2QuestionsSoal)
router.get('/questions/cfit3/contoh', getCfit3QuestionsContoh)
router.get('/questions/cfit3/soal', getCfit3QuestionsSoal)
router.get('/questions/cfit4/contoh', getCfit4QuestionsContoh)
router.get('/questions/cfit4/soal', getCfit4QuestionsSoal)

//DISC
router.get('/questions/disc', getDiscQuestions)

//PAPIKOSTICK
router.get('/questions/papikostik', getPapikostikQuestions)

export default router