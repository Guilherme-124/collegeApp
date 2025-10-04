import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { ENV } from "./env.js";
import * as schema from "../db/schemas.model.ts";

const sql = neon(ENV.DATABASE_URL!);
export const db = drizzle(sql, { schema });
