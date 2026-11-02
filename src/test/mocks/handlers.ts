import { http, HttpResponse } from 'msw';
import { env } from '@/config/env';

export const handlers = [
  // Auth login handler
  http.post(`${env.VITE_API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };

    if (body.email === 'admin@example.com' && body.password === 'secret123') {
      return HttpResponse.json({
        user: {
          id: 'usr_01',
          name: 'Super Admin',
          email: 'admin@example.com',
          role: 'admin',
          createdAt: new Date().toISOString(),
        },
        token: 'mock-jwt-token-xyz',
      });
    }

    return HttpResponse.json(
      {
        message: 'Kredensial tidak valid.',
        statusCode: 401,
      },
      { status: 401 }
    );
  }),

  // Current user handler
  http.get(`${env.VITE_API_BASE_URL}/auth/me`, () => {
    return HttpResponse.json({
      id: 'usr_01',
      name: 'Super Admin',
      email: 'admin@example.com',
      role: 'admin',
      createdAt: '2025-01-01T00:00:00Z',
    });
  }),

  // Users list handler
  http.get(`${env.VITE_API_BASE_URL}/users`, () => {
    return HttpResponse.json({
      items: [
        {
          id: 'u-1',
          name: 'Ahmad Rizky',
          email: 'ahmad@example.com',
          role: 'admin',
          status: 'active',
          lastActive: 'Baru saja',
        },
        {
          id: 'u-2',
          name: 'Siti Sarah',
          email: 'siti@example.com',
          role: 'editor',
          status: 'active',
          lastActive: '10 menit lalu',
        },
      ],
      total: 2,
      page: 1,
      limit: 10,
    });
  }),
];
