import * as v from 'valibot';

/**
 * Valibot schema to strictly validate environment variables.
 * Guarantees zero runtime crashes from undefined or misconfigured env variables.
 */
const EnvSchema = v.object({
  VITE_API_BASE_URL: v.pipe(
    v.string('VITE_API_BASE_URL is required'),
    v.url('VITE_API_BASE_URL must be a valid URL string')
  ),
  VITE_APP_NAME: v.pipe(
    v.string('VITE_APP_NAME is required'),
    v.minLength(1, 'VITE_APP_NAME cannot be empty')
  ),
  VITE_ENABLE_DEVTOOLS: v.pipe(
    v.optional(v.string(), 'false'),
    v.transform((val) => val === 'true')
  ),
  MODE: v.optional(v.string(), 'development'),
  DEV: v.optional(v.boolean(), true),
  PROD: v.optional(v.boolean(), false),
});

const rawEnv = {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
};

const parsed = v.safeParse(EnvSchema, rawEnv);

if (!parsed.success) {
  console.error('❌ Invalid or missing environment variables:');
  parsed.issues.forEach((issue) => {
    const path = issue.path?.map((p) => p.key).join('.') || 'root';
    console.error(`  - [${path}]: ${issue.message}`);
  });
  throw new Error('Environment variable validation failed. Check console for details.');
}

export type Env = v.InferOutput<typeof EnvSchema>;
export const env: Env = parsed.output;
