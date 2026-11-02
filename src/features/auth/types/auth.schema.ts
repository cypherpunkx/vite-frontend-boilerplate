import * as v from 'valibot';

/**
 * Valibot schemas for Authentication domain.
 * Ultra-lightweight, modular, tree-shakeable validation.
 */
export const LoginSchema = v.object({
  email: v.pipe(
    v.string('Email harus diisi'),
    v.nonEmpty('Email tidak boleh kosong'),
    v.email('Format email tidak valid')
  ),
  password: v.pipe(
    v.string('Password harus diisi'),
    v.minLength(6, 'Password minimal harus 6 karakter')
  ),
});

export type LoginInput = v.InferInput<typeof LoginSchema>;
export type LoginOutput = v.InferOutput<typeof LoginSchema>;

export const UserSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.pipe(v.string(), v.email()),
  role: v.picklist(['admin', 'user', 'manager']),
  createdAt: v.string(),
});

export type User = v.InferOutput<typeof UserSchema>;

export const AuthResponseSchema = v.object({
  user: UserSchema,
  token: v.string(),
});

export type AuthResponse = v.InferOutput<typeof AuthResponseSchema>;
