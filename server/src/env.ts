import 'dotenv/config';
import {z} from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().startsWith('postgres://'),
  GENAI_API_KEY: z.string(),
  HOST: z.string().default('0.0.0.0'),
});

export const env = envSchema.parse(process.env);