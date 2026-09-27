import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),

  HF_TOKEN: z.string().min(1, 'HF_TOKEN is required'),
  HF_MODEL: z.string().min(1).default('Qwen/Qwen3-8B:cheapest'),
  HF_MAX_TOKENS: z.coerce.number().int().min(1).max(2048).default(300),
  HF_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.7),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(15 * 60 * 1000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(30),

  CHROMA_URL: z.string().url().default('http://localhost:8000'),
  CHROMA_COLLECTION: z.string().min(1).default('zapledge-knowledge'),
  CHROMA_API_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
