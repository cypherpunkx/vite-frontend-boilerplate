import { createRootRoute, Outlet } from '@tanstack/react-router';
import { AppShell } from '@/shared/components/layout/app-shell';

export const rootRoute = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
