import { createRoute, Link } from '@tanstack/react-router';
import { rootRoute } from './root';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Selamat Datang{isAuthenticated && user ? `, ${user.name}` : ''}!
          </h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Sistem arsitektur frontend production-ready dengan standardisasi best practices:
            modular, resilient, performan, dan sepenuhnya divalidasi menggunakan <strong>Valibot</strong>.
          </p>
        </div>
        {!isAuthenticated && (
          <Link to="/login">
            <Button size="lg">Masuk ke Sistem</Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:border-blue-300 transition-colors">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
              <Zap className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Valibot Validation</CardTitle>
            <CardDescription className="text-xs">
              Validasi runtime modular dan zero-overhead untuk form dan skema respons API.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-blue-300 transition-colors">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-2">
              <RefreshCw className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">TanStack Query v5</CardTitle>
            <CardDescription className="text-xs">
              Manajemen server-state dengan background refetching dan caching resilient.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-blue-300 transition-colors">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Resilient HTTP Client</CardTitle>
            <CardDescription className="text-xs">
              Axios terpusat dengan auto token injection dan normalisasi error seragam.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-blue-300 transition-colors">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
              <Layers className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Vertical Slices</CardTitle>
            <CardDescription className="text-xs">
              Feature-driven architecture yang siap diskalakan tanpa merge conflicts.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Panduan Pengujian Arsitektur</CardTitle>
          <CardDescription>
            Silakan navigasikan ke menu Manajemen Pengguna atau lakukan autentikasi di halaman Login.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <p>
            1. Buka <strong>Manajemen Pengguna</strong> untuk melihat implementasi TanStack Query terintegrasi dengan validasi skema Valibot.
          </p>
          <p>
            2. Buka halaman <strong>Masuk</strong> untuk mencoba validasi form terintegrasi (React Hook Form + `@hookform/resolvers/valibot`).
          </p>
          <p>
            3. Jalankan suite testing otomatis dengan <code>pnpm test</code> untuk menjalankan pengujian integrasi Vitest + React Testing Library + MSW.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
