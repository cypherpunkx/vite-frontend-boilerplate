import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { useLogout } from '@/features/auth/api/auth.api';
import { Button } from '@/shared/components/ui/button';
import { appConfig } from '@/config/app.config';
import { Menu, X, LogOut, User as UserIcon, Code2 } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                <Code2 className="h-5 w-5" />
              </span>
              <span className="tracking-tight">{appConfig.name}</span>
            </Link>

            <nav className="hidden md:flex gap-1">
              {appConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors [&.active]:text-blue-600 [&.active]:bg-blue-50/60 [&.active]:font-semibold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-800">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-1.5 text-slate-700"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Keluar
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="gap-1.5">
                  <UserIcon className="h-3.5 w-3.5" />
                  Masuk
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
            {appConfig.navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-slate-50 [&.active]:text-blue-600 [&.active]:bg-blue-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-200">
              {isAuthenticated && user ? (
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800">{user.name}</p>
                    <p className="text-slate-500">{user.email}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Keluar
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Masuk
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Generic Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {appConfig.name}. Production-grade template.</p>
          <p className="text-slate-400">
            Powered by Vite, React 19, Valibot, TanStack Router & Query, and Zustand.
          </p>
        </div>
      </footer>
    </div>
  );
}
