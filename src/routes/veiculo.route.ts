import express from "express";
import { 
  getVeiculos,
  createVeiculo,
  editInfoVeiculo,
  deleteVeiculo,
} from "../controllers/veiculo.controlles";

const router = express.Router();

router.get("/veiculos", getVeiculos);
router.post("/createVeiculo", createVeiculo);
router.post("/:veiculoId/editInfoVeiculo", editInfoVeiculo);
router.delete("/:veiculoId/deleteVeiculo", deleteVeiculo);


export default router;