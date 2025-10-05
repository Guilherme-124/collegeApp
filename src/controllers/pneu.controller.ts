import { Request, Response } from "express";
import { pneusTable, pneuMovimentacaoTable, movimentacaoPneuTable } from "../db/schemas.model.ts";
import { db } from "../config/bd.ts";
import { eq } from "drizzle-orm";


export const getPneus = async (req: Request, res: Response) => {
  try {
    const pneus = await db.select().from(pneusTable);

    return res.status(200).json(pneus);
  } catch (error) {
    console.error("Error fetching pneus:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const createPneu = async (req: Request, res: Response) => {
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
    console.log("Error adding pneu", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};

export const editInfoPneu = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const update = req.body;

    const pneuExists = await db.query.pneusTable.findFirst({
      where: eq(pneusTable.id, Number(id)),
    });

    if (!pneuExists) {
      return res.status(404).json({error: "Pneu not found"})
    }

    await db
      .update(pneusTable)
      .set(update)
      .where(eq(pneusTable.id, Number(id)))

      res.status(201).json({message: "pneu updated"});
  } catch (error) {
    console.log("Error adding pneu", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};

export const deletePneu = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const pneuExists = await db.query.pneusTable.findFirst({
      where: eq(pneusTable.id, Number(id)),
    });

    if (!pneuExists) {
      return res.status(404).json({error: "Pneu not found"})
    }

    await db
      .delete(pneusTable)
      .where(eq(pneusTable.id, Number(id)))

      res.status(201).json({message: "pneu updated"});
  } catch (error) {
    console.log("Error adding pneu", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};

export const pneuMovimentacao = async (req: Request, res: Response) => {
  try {
    const { pneuId } = req.params;
    const movimentacoes = await db
    .select()
    .from(pneuMovimentacaoTable)
    .where(eq(pneuMovimentacaoTable.pneuId, Number(pneuId)));

    res.status(200).json(movimentacoes);
  } catch (error) {
    console.log("Error adding pneu", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};

export const editMovimentacaoPneu = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {tipoMovimentacao, observacoes} = req.body;

    const pneuExists = await db.query.pneusTable.findFirst({
      where: eq(pneusTable.id, Number(id)),
    });

    if (!pneuExists) {
      return res.status(404).json({error: "Pneu not found"})
    }

    const newMovimentacao = await db
      .insert(movimentacaoPneuTable)
      .values({
        pneuId: Number(id),
        tipoMovimentacao,
        data: new Date(),
        observacoes,
      })
      .returning();

      res.status(201).json({
        message: "Movimentacao adicionada",
        movimentacao: newMovimentacao,
      });
  } catch (error) {
    console.log("Error adding pneu", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};
