import { QueryClient } from '@tanstack/react-query';
import type { ApiErrorResponse } from '@/shared/types/api';

/**
 * Global TanStack QueryClient with resilient retry policies,
 * caching windows, and error logging.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes fresh window
      gcTime: 1000 * 60 * 10, // 10 minutes garbage collection
      refetchOnWindowFocus: false,
      retry: (failureCount, error: unknown) => {
        // Do not retry client validation errors or auth errors
        const apiError = error as ApiErrorResponse | undefined;
        if (apiError?.statusCode) {
          if ([400, 401, 403, 404, 422].includes(apiError.statusCode)) {
            return false;
          }
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false, // Never automatically retry mutating operations (POST, PUT, DELETE)
    },
  },
});
