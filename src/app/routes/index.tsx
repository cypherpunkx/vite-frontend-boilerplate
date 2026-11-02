import { createRoute, Link } from '@tanstack/react-router';
import { rootRoute } from './root';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { appConfig } from '@/config/app.config';
import {
  ShieldCheck,
  Zap,
  Layers,
  RefreshCw,
  Terminal,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="success">Production Ready</Badge>
            <Badge variant="secondary">v{appConfig.version}</Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {appConfig.title}
          </h1>
          <p className="text-slate-600 max-w-2xl text-base">
            Template fondasi frontend universal dengan standar arsitektur tingkat tinggi:
            modular, tahan banting, mudah diskalakan, dan divalidasi penuh menggunakan{' '}
            <strong className="text-slate-900 font-semibold">Valibot v1.x</strong>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/examples">
            <Button size="lg" className="gap-2 shadow-sm">
              Jelajahi Contoh CRUD
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          {!isAuthenticated && (
            <Link to="/login">
              <Button variant="outline" size="lg">
                Masuk Demo
              </Button>
            </Link>
          )}
        </div>
      </div>

      {isAuthenticated && user && (
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Sesi Aktif: {user.name} ({user.email})
              </p>
              <p className="text-xs text-slate-500">
                Role: <span className="font-mono text-blue-700">{user.role}</span> • State dikelola
                oleh Zustand Persistent Store
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:border-blue-400 hover:shadow-md transition-all">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
              <Zap className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Valibot Validation</CardTitle>
            <CardDescription className="text-xs">
              Validasi runtime modular & ultra-lightweight (<span className="font-mono">&lt;1KB</span>).
              Mengamankan env vars, form, dan response API server.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-blue-400 hover:shadow-md transition-all">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
              <RefreshCw className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">TanStack Query v5</CardTitle>
            <CardDescription className="text-xs">
              Manajemen server state cerdas dengan deduplication, caching 2-10 menit, dan smart retry policy.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-blue-400 hover:shadow-md transition-all">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center mb-2">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Resilient API Client</CardTitle>
            <CardDescription className="text-xs">
              Axios terpusat dengan Fetch adapter, automatic auth injection, dan normalisasi error seragam.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-blue-400 hover:shadow-md transition-all">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
              <Layers className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Vertical Slices</CardTitle>
            <CardDescription className="text-xs">
              Feature-driven architecture mandiri (`api`, `components`, `types`, `hooks`). Siap diskalakan untuk multi-team.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Developer Quickstart Card */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-slate-700" />
            <CardTitle>Cara Memulai Project Baru Menggunakan Template Ini</CardTitle>
          </div>
          <CardDescription>
            Gunakan panduan singkat berikut untuk menyesuaikan template ini dengan kebutuhan bisnis spesifik Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                Langkah 1
              </span>
              <p className="font-semibold text-slate-900 mt-2">Konfigurasi Identitas</p>
              <p className="text-xs text-slate-600">
                Ubah informasi nama, logo, navigasi di <code>src/config/app.config.ts</code> dan variabel lingkungan di <code>.env</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                Langkah 2
              </span>
              <p className="font-semibold text-slate-900 mt-2">Generate Modul Fitur</p>
              <p className="text-xs text-slate-600">
                Gunakan script generator otomatis:
                <br />
                <code className="text-[11px] bg-slate-200 px-1 py-0.5 rounded font-mono">
                  pnpm run create:feature &lt;nama-fitur&gt;
                </code>
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                Langkah 3
              </span>
              <p className="font-semibold text-slate-900 mt-2">Daftarkan Route</p>
              <p className="text-xs text-slate-600">
                Tambahkan halaman ke <code>src/app/routes/</code> dan daftarkan ke router di <code>src/app/router.tsx</code>.
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-200">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Lihat dokumentasi lengkap di file <code>README.md</code> dan <code>TEMPLATE-GUIDE.md</code>.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
