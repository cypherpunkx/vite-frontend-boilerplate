# 🚀 Vite + React Enterprise Template

Template arsitektur frontend universal yang dirancang untuk kebutuhan **Production-Ready, Resilient (Tahan Banting), Berperforma Tinggi, dan Mudah Diperluas (Extensible)** di berbagai jenis project web (SaaS, Internal Dashboard, Portal Bisnis, E-Commerce Admin, dll).

Dibangun menggunakan fondasi **Vite + React 19 + TypeScript**, divalidasi penuh menggunakan **Valibot v1.x**, dan mengadopsi **Feature-Driven Architecture (Vertical Slices)**.

---

## ✨ Fitur Unggulan Template

- ⚡ **Vite + React 19 + TypeScript**: Build kilat, HMR instan, type safety ketat end-to-end tanpa overhead SSR.
- 🛡️ **Validasi Data Valibot v1.x**: Validasi modular tree-shakeable (<1KB) untuk environment variables, form input, dan response API server.
- 🧭 **TanStack Router**: 100% type-safe routing, validasi URL query parameters otomatis, dan intent preloading.
- 🔄 **TanStack Query v5**: Manajemen server state cerdas dengan caching window 2-10 menit, deduplikasi request, dan smart retry policy.
- 📦 **Zustand Client Store**: Global state ringan (<1KB) dengan middleware persistence untuk auth token & user preferences.
- 🎨 **Tailwind CSS v4 + Radix Primitives**: Aksesibilitas bawaan (WAI-ARIA) dengan ownership penuh kode komponen di repo sendiri.
- 🌐 **Resilient HTTP Client**: Axios terpusat dengan Fetch adapter, automatic auth injection, dan normalisasi error seragam.
- 🧩 **Scaffolding Otomatis**: CLI generator `pnpm run create:feature <nama>` untuk membuat modul fitur baru dalam hitungan detik.
- 🧪 **Testing Suite Siap Pakai**: Vitest + React Testing Library + MSW v3 (Mock Service Worker) untuk unit & integrasi jaringan terisolasi.
- 🐳 **Docker & Nginx Ready**: Multi-stage `Dockerfile` dan `nginx.conf` siap deploy ke Kubernetes, Cloud Run, atau ECS.
- 🤖 **CI/CD Quality Gate**: GitHub Actions workflow otomatis untuk linting, typechecking, testing, dan build.

---

## 📁 Struktur Direktori Template

```text
├── .github/workflows/           # CI/CD GitHub Actions (Lint, Typecheck, Test, Build)
├── scripts/
│   └── create-feature.mjs       # Generator otomatis modul fitur baru
├── src/
│   ├── app/                     # Konfigurasi aplikasi & root routing
│   │   ├── routes/              # TanStack Router routes (root, index, login, examples)
│   │   ├── index.css            # Tailwind CSS v4 & theme variables
│   │   ├── providers.tsx        # QueryClientProvider, ErrorBoundary, Devtools
│   │   └── router.tsx           # Router assembly & type registration
│   ├── config/                  # Konfigurasi global & env validation
│   │   ├── app.config.ts        # Identitas & navigasi aplikasi (kustomisasi mudah)
│   │   └── env.ts               # Valibot strict env validator
│   ├── features/                # Domain Fitur Bisnis (Vertical Slices)
│   │   ├── auth/                # Modul Autentikasi (Universal)
│   │   └── users/               # Referensi implementasi CRUD
│   ├── shared/                  # Reusable shared elements
│   │   ├── components/
│   │   │   ├── layout/          # AppShell, PageHeader
│   │   │   └── ui/              # Button, Input, Label, Card, Badge, Spinner, EmptyState
│   │   ├── lib/                 # apiClient, queryClient, utils `cn()`
│   │   └── types/               # Global types (ApiResponse, PaginatedResponse)
│   └── test/                    # Setup Vitest & MSW mock server
├── Dockerfile                   # Multi-stage production build (Node -> Nginx Alpine)
├── nginx.conf                   # Nginx security headers, gzip, & SPA routing fallback
├── TEMPLATE-GUIDE.md            # Panduan kustomisasi & pengembangan fitur
└── README.md                    # Dokumentasi utama
```

---

## ⚡ Panduan Singkat (Quickstart)

```bash
# 1. Install dependensi
pnpm install

# 2. Setup environment variables
cp .env.example .env

# 3. Jalankan development server
pnpm dev
```

---

## 🛠️ Daftar Perintah (Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `pnpm dev` | Menjalankan Vite development server di `http://localhost:3000` |
| `pnpm run create:feature <nama>` | Men-generate modul fitur baru lengkap dengan skema Valibot & TanStack Query |
| `pnpm run typecheck` | Menjalankan pemeriksaan tipe TypeScript ketat (`tsc --noEmit`) |
| `pnpm test` | Menjalankan suite pengujian otomatis (Vitest + RTL + MSW) |
| `pnpm run lint` | Menjalankan pemeriksaan gaya kode ESLint (Flat Config) |
| `pnpm run lint:fix` | Memperbaiki masalah linting otomatis |
| `pnpm run format` | Menjalankan formatting kode Prettier |
| `pnpm run build` | Menghasilkan build produksi teroptimasi di direktori `dist/` |
| `pnpm run preview` | Menjalankan preview lokal dari hasil build produksi |

---

## 📖 Panduan Lengkap

Silakan baca [TEMPLATE-GUIDE.md](file:///c:/Users/Admin/Documents/99_PRIBADI/Programming/pg-2/TEMPLATE-GUIDE.md) untuk panduan mendalam tentang:
- Mengubah branding dan navigasi
- Menambahkan endpoint dan skema validasi baru
- Menghubungkan fitur ke router
- Konfigurasi autentikasi dan route guard
- Deploy ke Vercel, Cloudflare Pages, atau Docker
