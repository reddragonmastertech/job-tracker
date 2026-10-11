import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  SHEET_ID: z.string().default(""),
  GOOGLE_SERVICE_ACCOUNT_JSON: z.string().default(""),
  OPENAI_API_KEY: z.string().default(""),
  API_TOKEN: z.string().default(""),
  PORT: z.coerce.number().default(8787),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
