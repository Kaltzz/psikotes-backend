import { Router } from "express";
import {
  addToken,
  nonactiveToken,
  getToken,
  getAllTokenStatusController,
  refreshTokenController,
} from "../controllers/token.controller";
import {
  getAllPeserta,
  getAllPosisi,
  getDetailPeserta,
  hasilPesertaController,
  hasilTesController,
  getAllHasilPosisiController,
  getCountAllPeserta,
} from "../controllers/peserta.controller";

const router = Router();

//  Token
router.get("/token", getToken);
router.get("/token/form", (req, res) => {});
router.post("/token", addToken);
router.put("/token/:id", nonactiveToken);
router.get("/token/status", getAllTokenStatusController);
router.put("/token/ref/refreshtoken", refreshTokenController);

//peserta
router.get("/peserta", getAllPeserta);
router.get("/peserta/detail/:id", getDetailPeserta);
router.get("/peserta/posisi", getAllPosisi);
router.get("/peserta/count", getCountAllPeserta);

//dashboard
router.get("/dashboard", (req, res) => {});

//hasil tes
router.get("/hasiltes", hasilPesertaController);
router.get("/hasiltes/hasil/:id", hasilTesController);
router.get("/hasiltes/posisi", getAllHasilPosisiController);
export default router;
