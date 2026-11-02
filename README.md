# Production-Ready Frontend Architecture

Arsitektur frontend enterprise modern yang dirancang untuk kebutuhan **Production-Ready, Resilient (Tahan Banting), Berperforma Tinggi, dan Mudah Diperluas**. Dibuat dengan fondasi **Vite + React 19 + TypeScript**, mengadopsi **Feature-Driven Architecture (Vertical Slices)**, dan divalidasi penuh menggunakan **Valibot**.

---

## 🚀 Tech Stack Utama

| Layer | Teknologi | Peran & Alasan Pemilihan |
| :--- | :--- | :--- |
| **Bundler & Core** | **Vite + React 19 + TypeScript** | Build super cepat, HMR instan, type safety ketat end-to-end tanpa overhead SSR. |
| **Package Manager** | **pnpm** | Strict dependency resolution (mencegah phantom dependencies) dan hemat disk. |
| **Routing** | **TanStack Router** | 100% type-safe paths & query params, auto code-splitting per route. |
| **Server State** | **TanStack Query (React Query v5)** | Caching pintar, background refetching, deduping request, optimistic UI. |
| **Client State** | **Zustand** | Ringan (< 1KB), non-boilerplate, decoupled dari lifecycle React untuk global session UI. |
| **Data Validation** | **Valibot (v1.x Terbaru)** | Modular, tree-shakeable (< 1KB vs Zod ~14KB), validasi skema form, env, dan API. |
| **Form Handling** | **React Hook Form + `@hookform/resolvers/valibot`** | Performa tinggi tanpa re-render berlebih, type-safe validation schema. |
| **HTTP Client** | **Axios (Fetch Adapter)** | Interceptor terpusat: auto token injection, normalisasi error seragam, kompatibel MSW. |
| **UI & Styling** | **Tailwind CSS v4 + Radix UI Primitives** | Aksesibilitas (WAI-ARIA) bawaan, zero runtime CSS overhead, full ownership kode UI. |
| **Testing Suite** | **Vitest + RTL + MSW v3** | Vite-native execution, test integrasi berbasis user event, mock network terisolasi. |
| **Code Quality** | **ESLint (Flat Config) + Prettier** | Standardisasi kode ketat dan pencegahan commit kode bermasalah. |

---

## 📁 Struktur Direktori (Feature-Driven / Vertical Slices)

```text
src/
├── app/                         # Konfigurasi aplikasi global
│   ├── routes/                  # Definisi route TanStack Router (root, index, login, users)
│   ├── index.css                # Tailwind CSS v4 & theme variables
│   ├── providers.tsx            # QueryClientProvider, ErrorBoundary, Devtools
│   └── router.tsx               # Inisialisasi router & type declarations
├── config/                      # Validasi environment variable berbasis Valibot
│   └── env.ts                   # Fail-fast env validator (VITE_API_BASE_URL, dll)
├── features/                    # Domain Bisnis Vertikal (Vertical Slices)
│   ├── auth/                    # Modul Autentikasi
│   │   ├── api/                 # Endpoint calls & TanStack Query hooks (useLoginMutation)
│   │   ├── components/          # Komponen UI spesifik auth (LoginForm)
│   │   ├── stores/              # Zustand persistent auth store (token, user)
│   │   └── types/               # Valibot schemas (LoginSchema, UserSchema)
│   └── users/                   # Modul Manajemen Pengguna
│       ├── api/                 # TanStack Query hook (useUsersQuery)
│       ├── components/          # Komponen UserList dengan pagination & status badge
│       └── types/               # Valibot schemas (UserItemSchema, UserListResponseSchema)
├── shared/                      # Reusable shared elements lintas domain
│   ├── components/
│   │   ├── ui/                  # Komponen UI atomik (Button, Input, Label, Card)
│   │   └── error-boundary.tsx   # Global React Error Boundary & Fallback UI
│   ├── lib/
│   │   ├── api-client.ts        # Axios terpusat dengan interceptor & error normalizer
│   │   ├── query-client.ts      # QueryClient dengan caching window & retry policy pintar
│   │   └── utils.ts             # Helper fungsi styling `cn()`
│   └── types/                   # Global API types (ApiResponse, PaginatedResponse)
└── test/                        # Infrastruktur testing
    ├── mocks/                   # MSW network mock handlers & server
    ├── setup.ts                 # Setup Vitest lifecycle
    └── test-utils.tsx           # Custom render wrapper dengan Provider isolasi
```

---

## 🛡️ Pola Ketahanan Sistem (Resilience Patterns)

1. **Strict Environment Validation (Valibot)**:
   Aplikasi langsung *fail-fast* saat build/startup jika variabel lingkungan tidak valid atau hilang, mencegah error di runtime production.
2. **Centralized Error Normalizer**:
   Axios interceptor menstandarkan semua response error (401, 403, 404, 422, 500) ke dalam tipe `ApiErrorResponse` seragam dan otomatis menangani token kedaluwarsa.
3. **Smart Retry Policy**:
   QueryClient tidak mengulangi request pada error validasi klien (400, 401, 403, 404, 422), namun otomatis mencoba ulang jika terjadi kegagalan jaringan atau server 5xx.
4. **Global Error Boundary**:
   Menangkap unhandled exception di tree React dan menampilkan antarmuka pemulihan yang ramah pengguna alih-alih layar putih (*white screen of death*).

---

## 🛠️ Panduan Perintah (Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `pnpm dev` | Menjalankan local development server dengan HMR |
| `pnpm typecheck` | Menjalankan type-checking TypeScript tanpa emit file |
| `pnpm test` | Menjalankan unit & integration test suite (Vitest + MSW) |
| `pnpm test:watch` | Menjalankan test dalam mode watch interaktif |
| `pnpm lint` | Menjalankan ESLint Flat Config pada seluruh codebase |
| `pnpm lint:fix` | Memperbaiki masalah linting otomatis |
| `pnpm format` | Menjalankan Prettier code formatting |
| `pnpm build` | Melakukan build produksi teroptimasi ke direktori `dist/` |
| `pnpm preview` | Menjalankan preview server dari hasil build `dist/` |

---

## 🚢 Rekomendasi Deployment (Production Static Host)

Karena aplikasi ini adalah Single Page Application (SPA), pastikan web server atau platform CDN (Vercel, Cloudflare Pages, Netlify, atau AWS CloudFront + S3) mengarahkan semua rute navigasi kembali ke `/index.html`:

- **Cloudflare Pages / Vercel**: Otomatis mendeteksi project Vite SPA.
- **Nginx**:
  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```
