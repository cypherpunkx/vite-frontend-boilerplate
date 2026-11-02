import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import { env } from '@/config/env';
import type { ApiErrorResponse } from '@/shared/types/api';

/**
 * Production-ready Axios instance with strict timeouts,
 * automatic authorization header injection, and centralized error normalization.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 15000,
  adapter: 'fetch',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor: Injects bearer token if present
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      }
    } catch {
      // Ignore JSON parse errors in localStorage
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// Response interceptor: Centralized error normalization and handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;

    // Normalize error payload
    const normalizedError: ApiErrorResponse = {
      statusCode: status ?? 500,
      message:
        error.response?.data?.message ||
        error.message ||
        'An unexpected network error occurred.',
      errors: error.response?.data?.errors,
    };

    if (status === 401) {
      // Trigger logout or clear storage if token expired
      localStorage.removeItem('auth-storage');
      // If we are not on auth page, we can redirect or dispatch auth event
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
    }

    return Promise.reject(normalizedError);
  }
);
