import express from "express";
import { 
  createPneu,
  deletePneu,
  editInfoPneu,
  editMovimentacaoPneu,
  getPneus,
  pneuMovimentacao,
} from "../controllers/pneu.controller.ts";

const router = express.Router();

router.get("/", getPneus);
router.post("/createPneu", createPneu);
router.post("/:pneuId/editInfoPneu", editInfoPneu);
router.delete("/:pneuId/deletePneu", deletePneu);
router.get("/:pneuId/movimentacao", pneuMovimentacao);
router.post("/:pneuId/editMovimentacao", editMovimentacaoPneu);

export default router;