import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as v from 'valibot';
import { apiClient } from '@/shared/lib/api-client';
import { useAuthStore } from '../stores/auth.store';
import {
  AuthResponseSchema,
  UserSchema,
  type AuthResponse,
  type LoginInput,
  type User,
} from '../types/auth.schema';

export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

/**
 * Mutation for logging in.
 * Validates backend response with Valibot before updating state.
 */
export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: LoginInput): Promise<AuthResponse> => {
      const response = await apiClient.post('/auth/login', credentials);
      const parsed = v.safeParse(AuthResponseSchema, response.data);

      if (!parsed.success) {
        console.error('API Response validation failed:', parsed.issues);
        throw new Error('Format data autentikasi server tidak valid.');
      }

      return parsed.output;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      queryClient.setQueryData(authKeys.profile(), data.user);
    },
  });
}

/**
 * Query for fetching current user profile.
 */
export function useCurrentUserQuery() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async (): Promise<User> => {
      const response = await apiClient.get('/auth/me');
      const parsed = v.safeParse(UserSchema, response.data);

      if (!parsed.success) {
        throw new Error('Data profil pengguna tidak valid.');
      }

      return parsed.output;
    },
    enabled: Boolean(token),
  });
}

/**
 * Hook for logging out and cleaning queries.
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return () => {
    clearAuth();
    queryClient.clear();
  };
}
