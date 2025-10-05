import express, { Express, Request, Response } from "express";
import "dotenv/config";
import { ENV } from "./config/env.ts";
import { job } from "./config/cron.ts";

import pneuRoutes from "./routes/pneu.route.ts"
import userRoutes from "./routes/borracheiro.route.ts"

const app: Express = express();
const PORT = ENV.PORT || 5001;

if (ENV.NODE_ENV === "production") job.start();

app.use(express.json());

app.get("/api/teste", (req: Request, res: Response) => {
  res.status(200).json({success: true});
});

app.use("/api/user", userRoutes);
app.use("/api/pneu", pneuRoutes);

app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});