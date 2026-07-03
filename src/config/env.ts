import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3100),
  SOCKET_PORT: z.coerce.number().default(3101),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  ACCESS_SECRET: z.string().min(1, "ACCESS_SECRET is required"),
  REFRESH_SECRET: z.string().min(1, "REFRESH_SECRET is required"),
  QR_SECRET: z.string().min(1, "QR_SECRET is required"),
  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PORT: z.coerce.number().default(6379),
  ADMIN_SECRET_KEY: z.string().optional(),
  MIDTRANS_SERVER_KEY: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_MAPS_API_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

export const getEnv = () => env;
