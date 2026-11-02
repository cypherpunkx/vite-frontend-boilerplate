import { createRootRoute, Link, Outlet, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { useLogout } from '@/features/auth/api/auth.api';
import { Button } from '@/shared/components/ui/button';

export const rootRoute = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { user, isAuthenticated } = useAuthStore();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                FE
              </span>
              EnterpriseApp
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link
                to="/"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors [&.active]:text-blue-600 [&.active]:font-semibold"
              >
                Dashboard
              </Link>
              <Link
                to="/users"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors [&.active]:text-blue-600 [&.active]:font-semibold"
              >
                Manajemen Pengguna
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-semibold text-slate-800">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Keluar
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm">Masuk</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Production Frontend Architecture Boilerplate • Valibot + TanStack Router & Query + Zustand
      </footer>
    </div>
  );
}
