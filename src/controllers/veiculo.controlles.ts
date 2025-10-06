import { Request, Response } from "express";
import { db } from "../config/bd.ts";
import { eq } from "drizzle-orm";
import { veiculosTable } from "../db/schemas.model.ts";


export const getVeiculos = async (req: Request, res: Response) => {
  try {
    const veiculo = await db.select().from(veiculosTable);

    if (!veiculo) return res.status(404).json({message: "Veiculo not found"});

    return res.status(200).json(veiculo);
  } catch (error) {
    console.error("Error fetching veiculos:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const createVeiculo = async (req: Request, res: Response) => {
  try {
    const { placa, nPneus, tipo } = req.body;

      if (!placa || !nPneus || !tipo ) {
        return res.status(400).json({error: "Missing required fields"});
      }

      const newVeiculo = await db
      .insert(veiculosTable)
      .values({
        placa,
        nPneus,
        tipo,
      })
      .returning();

      res.status(201).json(newVeiculo);
  } catch (error) {
    console.log("Error adding veiculo", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};

export const editInfoVeiculo = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const update = req.body;

    const pneuExists = await db.query.veiculosTable.findFirst({
      where: eq(veiculosTable.id, Number(id)),
    });

    if (!pneuExists) {
      return res.status(404).json({error: "user not found"})
    }

    await db
      .update(veiculosTable)
      .set(update)
      .where(eq(veiculosTable.id, Number(id)));

      res.status(201).json({message: "veiculo updated"});
  } catch (error) {
    console.log("Error editing veiculo", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};

export const deleteVeiculo = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const pneuExists = await db.query.veiculosTable.findFirst({
      where: eq(veiculosTable.id, Number(id)),
    });

    if (!pneuExists) {
      return res.status(404).json({error: "veiculo not found"})
    }

    await db
      .delete(veiculosTable)
      .where(eq(veiculosTable.id, Number(id)))

      res.status(201).json({message: "veiculo deletado"});
  } catch (error) {
    console.log("Error deleting veiculo", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};

/* getPneusInVeiculo */