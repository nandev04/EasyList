import dotenv from 'dotenv';
import { z } from 'zod';
import ms, { type StringValue } from 'ms';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  FRONTEND_URL: z.url(),

  DATABASE_URL: z.url(),
  DIRECT_URL: z.url(),

  REDIS_URL: z.url(),
  REDIS_PORT: z.coerce.number().optional(),

  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_ACCESS_EXPIRES_IN: z
    .string()
    .refine((val) => (ms(val as StringValue) as number | undefined) !== undefined, {
      message: 'Invalid duration format. Use formats like "15m", "1h", "7d"'
    })
    .transform((val) => val as StringValue),
  TOKEN_REFRESH_EXPIRES_IN: z
    .string()
    .refine((val) => (ms(val as StringValue) as number | undefined) !== undefined, {
      message: 'Invalid duration format. Use formats like "15m", "1h", "7d"'
    })
    .transform((val) => val as StringValue),
  COOKIE_SECRET: z.string().min(1),

  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_S3_REGION: z.string().min(1),
  AWS_S3_BUCKET: z.string().min(1),
  AWS_S3_BUCKET_URL: z.url(),
  RESEND_API_KEY: z.string().min(1),
  SEND_EMAIL_FROM: z.email(),

  MAX_DEVICES_PER_USER: z.coerce.number().default(5)
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error('Invalid environment variables:\n' + z.prettifyError(result.error));
  process.exit(1);
}

export const env = result.data;
