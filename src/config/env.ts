import "dotenv/config";

export const ENV: {
  PORT: number | string;
  DATABASE_URL: string;
  NODE_ENV?: string
} = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  NODE_ENV:process.env.NODE_ENV,
}