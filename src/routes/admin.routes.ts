import { Router } from "express";
import { addToken, nonactiveToken, getToken, spesificToken } from "../controllers/token.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { 
    getAllPeserta, 
    getAllPosisi, 
    getDetailPeserta,
    hasilPesertaController,
    hasilTesController,
    getAllHasilPosisiController
} from "../controllers/peserta.controller";
import { getDashboard } from "../controllers/dashboard.controller";
import { authRoleMiddleware } from "../middlewares/autRole.middleware";



const router = Router()

//  Token
router.get('/token', getToken)
router.get('/token/form', (req, res)=> {})
router.post('/token', addToken)
router.get('/token/:id', spesificToken)
router.put('/token/:id', nonactiveToken)

//peserta
router.get('/peserta', getAllPeserta)
router.get('/peserta/detail/:id', getDetailPeserta)
router.get('/peserta/posisi', getAllPosisi)
// router.get('/peserta/time', getFilteredTime)

//dashboard
router.get('/dashboard', (req, res)=>{})

//hasil tes
router.get('/hasiltes', hasilPesertaController)
router.get('/hasiltes/hasil/:id', hasilTesController)
router.get('/hasiltes/posisi', getAllHasilPosisiController)
export default router