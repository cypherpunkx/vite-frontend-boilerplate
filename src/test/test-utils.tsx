import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

interface AllTheProvidersProps {
  children: React.ReactNode;
}

export function createWrapper(client = createTestQueryClient()) {
  return function AllTheProviders({ children }: AllTheProvidersProps) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { queryClient?: QueryClient }
) {
  const testQueryClient = options?.queryClient ?? createTestQueryClient();
  return {
    ...render(ui, { wrapper: createWrapper(testQueryClient), ...options }),
    queryClient: testQueryClient,
  };
}
