import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  APP_DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(24, "JWT_SECRET must be at least 24 characters."),
  JWT_EXPIRES_IN: z.string().default("8h"),
  PORT: z.coerce.number().default(4000),
  CLIENT_ORIGINS: z
    .string()
    .default("http://localhost:5173,http://127.0.0.1:5173,http://[::1]:5173")
    .transform((value) => value.split(",").map((origin) => origin.trim()).filter(Boolean))
});

export const env = envSchema.parse(process.env);
