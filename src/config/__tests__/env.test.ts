import { describe, it, expect } from 'vitest';
import * as v from 'valibot';

describe('Valibot Environment Validation Schema', () => {
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
  });

  it('passes validation when valid environment variables are supplied', () => {
    const validData = {
      VITE_API_BASE_URL: 'https://api.myproductionapp.com/v1',
      VITE_APP_NAME: 'Production Platform',
      VITE_ENABLE_DEVTOOLS: 'true',
    };

    const result = v.safeParse(EnvSchema, validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.output.VITE_ENABLE_DEVTOOLS).toBe(true);
      expect(result.output.VITE_APP_NAME).toBe('Production Platform');
    }
  });

  it('fails validation when URL is invalid or fields are missing', () => {
    const invalidData = {
      VITE_API_BASE_URL: 'not-a-valid-url',
      VITE_APP_NAME: '',
    };

    const result = v.safeParse(EnvSchema, invalidData);
    expect(result.success).toBe(false);
  });
});
