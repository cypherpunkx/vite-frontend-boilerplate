import { useQuery } from '@tanstack/react-query';
import * as v from 'valibot';
import { apiClient } from '@/shared/lib/api-client';
import { UserListResponseSchema, type UserListResponse } from '../types/user.schema';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: { page: number; limit: number }) => [...userKeys.lists(), params] as const,
};

export function useUsersQuery(page = 1, limit = 10) {
  return useQuery({
    queryKey: userKeys.list({ page, limit }),
    queryFn: async (): Promise<UserListResponse> => {
      const response = await apiClient.get('/users', {
        params: { page, limit },
      });

      const parsed = v.safeParse(UserListResponseSchema, response.data);
      if (!parsed.success) {
        console.error('User list schema mismatch:', parsed.issues);
        throw new Error('Format data pengguna dari server tidak sesuai skema.');
      }

      return parsed.output;
    },
  });
}
