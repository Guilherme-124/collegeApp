import express, { Express, Request, Response } from "express";
import "dotenv/config";
import { ENV } from "./config/env.ts";
import { db } from "./config/bd.ts";
import { pneuMovimentacaoTable, pneusTable } from "./db/schemas.model.ts";
import { eq } from "drizzle-orm";

const app: Express = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());

app.get("/api/teste", (req: Request, res: Response) => {
  res.status(200).json({success: true});
});

app.post("/api/outro", async (req: Request, res: Response) => {
  try {
    const {
      marca,
      kmAtual,
      kmLimite, 
      preco, 
      tipo, 
      medidaPneu, 
      numeroDot,
      ultimaPressao,
      pressaoPneu, 
      profundidadeSulco, 
      posicao, 
      veiculoId} = req.body;

      if (!marca || !kmLimite || !numeroDot || !pressaoPneu || !veiculoId || !profundidadeSulco || !tipo || !medidaPneu) {
        return res.status(400).json({error: "Missing required fields"});
      }

      const novoPneu = await db
      .insert(pneusTable)
      .values({
        marca,
        kmAtual,
        kmLimite, 
        preco, 
        tipo, 
        medidaPneu, 
        numeroDot,
        ultimaPressao,
        pressaoPneu, 
        profundidadeSulco, 
        posicao, 
        veiculoId,
      })
      .returning();

      res.status(201).json(novoPneu);
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong"});
  }
});

app.get("/api/outro/:pneuId/movimentacao", async (req: Request, res: Response) => {
  try {
    const { pneuId } = req.params;
    const movimentacoes = await db
    .select()
    .from(pneuMovimentacaoTable)
    .where(eq(pneuMovimentacaoTable.pneuId, Number(pneuId)));

    res.status(200).json(movimentacoes);
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong"});
  }
});

app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});