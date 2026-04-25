import { z } from 'zod';

const nonBlankString = z.string().refine((value) => value.trim().length > 0, {
  message: 'Required',
});

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .regex(/^\d+$/, { message: 'PORT must be an integer between 1 and 65535' })
    .transform(Number)
    .refine((n) => n >= 1 && n <= 65535, {
      message: 'PORT must be an integer between 1 and 65535',
    })
    .optional(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: nonBlankString.optional(),
  API_KEY: nonBlankString.optional(),
  BOT_TOKEN: nonBlankString,
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
