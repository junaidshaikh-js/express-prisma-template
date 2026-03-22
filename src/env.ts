import { env as loadEnv } from 'custom-env';
import { z } from 'zod';

process.env.APP_ENV = process.env.APP_ENV || 'dev';

const isDevelopment = process.env.APP_ENV === 'dev';
const isTesting = process.env.APP_ENV === 'test';

if (isDevelopment) {
  loadEnv();
} else if (isTesting) {
  loadEnv('test');
}

const envSchema = z.object({
  APP_ENV: z.enum(['dev', 'test', 'production']).default('dev'),

  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().positive().default(5500),

  DATABASE_URL: z.string().startsWith('postgresql://'),

  CORS_ORIGIN: z
    .union([
      z.string().transform((str) =>
        str.split(',').map((s) => {
          const value = s.trim();

          if (value.startsWith('/') && value.lastIndexOf('/') > 0) {
            const lastSlash = value.lastIndexOf('/');
            const pattern = value.slice(1, lastSlash);
            const flags = value.slice(lastSlash + 1);

            return new RegExp(pattern, flags);
          }

          return value;
        })
      ),
      z.array(z.string()),
    ])
    .default([]),
});

type EnvType = z.infer<typeof envSchema>;

let Env: EnvType;

try {
  Env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(error.format(), null, 2)
    );

    error.issues.forEach((err) => {
      const path = err.path.join('.');
      console.log(`${path}: ${err.message}`);
    });

    process.exit(1);
  }
  throw error;
}

export const isProduction = () => Env.APP_ENV === 'production';
export const isDev = () => Env.APP_ENV === 'dev';
export const isTest = () => Env.APP_ENV === 'test';

export default Env;
