import express from "express";
import { 
  createUser, 
  editInfoUser, 
  deleteUser, 
  getUsers,
  login,
 } from "../controllers/borracheiro.controller.ts";

const router = express.Router();

router.get("/listUsers", getUsers);
router.post("/createUser", createUser);
router.post("/login", login);
router.post("/:userId/editInfoUser", editInfoUser);
router.delete("/:userId/deleteUser", deleteUser);

export default router;