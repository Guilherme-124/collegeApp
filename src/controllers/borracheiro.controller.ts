import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { db } from "../config/bd.ts";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schemas.model.ts";


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.select().from(usersTable);

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nome, funcao, telefone, email, password } = req.body;

      if (!nome || !funcao || ! telefone || !email || !password ) {
        return res.status(400).json({error: "Missing required fields"});
      }

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await db
      .insert(usersTable)
      .values({
        nome,
        funcao: funcao || "borracheiro",
        telefone,
        email,
        password: hashedPassword,
        salt,
      })
      .returning();

      res.status(201).json(newUser);
  } catch (error) {
    console.log("Error adding user", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

      if (!email || !password ) {
        return res.status(400).json({error: "Missing required fields"});
      }

      const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, email),
      });

      if (!user) return res.status(404).json({ error: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(401).json({error: "Invalid credentials"});
      }

      res.status(200).json();
  } catch (error) {
    console.log("Error login in", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};

export const editInfoUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const update = req.body;

    const pneuExists = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, Number(id)),
    });

    if (!pneuExists) {
      return res.status(404).json({error: "user not found"})
    }

    await db
      .update(usersTable)
      .set(update)
      .where(eq(usersTable.id, Number(id)))

      res.status(201).json({message: "user updated"});
  } catch (error) {
    console.log("Error editing user", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const pneuExists = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, Number(id)),
    });

    if (!pneuExists) {
      return res.status(404).json({error: "User not found"})
    }

    await db
      .delete(usersTable)
      .where(eq(usersTable.id, Number(id)))

      res.status(201).json({message: "user updated"});
  } catch (error) {
    console.log("Error deleting user", error);
    res.status(500).json({ error: "Something went wrong"});
  }
};