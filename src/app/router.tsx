import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './routes/root';
import { indexRoute } from './routes/index';
import { loginRoute } from './routes/login';
import { usersRoute } from './routes/users';

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, usersRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Register router for typesafety across TanStack Router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
