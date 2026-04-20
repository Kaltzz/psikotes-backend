import { Router } from "express";
import { addToken, nonactiveToken, getToken, spesificToken } from "../controllers/token.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { 
    getAllPeserta, 
    getDetailPeserta,
    hasilPesertaController,
    hasilTesController
} from "../controllers/peserta.controller";
import { getDashboard } from "../controllers/dashboard.controller";



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

//dashboard
router.get('/dashboard', (req, res)=>{})

//hasil tes
router.get('/hasiltes', hasilPesertaController)
router.get('/hasiltes/hasil/:id', hasilTesController)


export default router