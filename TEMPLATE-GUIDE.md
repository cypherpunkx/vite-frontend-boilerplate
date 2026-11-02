# 📘 Template Quickstart & Customization Guide

Dokumen ini adalah panduan praktis bagi developer atau tim yang menggunakan template ini untuk memulai project baru dari nol.

---

## ⚡ 1. Memulai Project Baru (3 Menit)

```bash
# 1. Clone repository atau salin folder project ke lokasi baru
git clone <url-repo-anda> my-new-app
cd my-new-app

# 2. Install dependensi
pnpm install

# 3. Salin environment variable
cp .env.example .env

# 4. Jalankan local development server
pnpm dev
```

Buka `http://localhost:3000` di browser.

---

## 🎨 2. Kustomisasi Identitas & Navigasi Aplikasi

Buka file **`src/config/app.config.ts`**:
```typescript
export const appConfig = {
  name: 'Nama Sistem Anda',
  title: 'Judul Lengkap Portal Anda',
  description: 'Deskripsi singkat mengenai sistem bisnis Anda',
  version: '1.0.0',
  navigation: [
    { label: 'Beranda', href: '/' },
    { label: 'Katalog Produk', href: '/products' },
    { label: 'Laporan Penjualan', href: '/reports' },
  ],
};
```
Perubahan di file ini akan otomatis memperbarui nama aplikasi pada Header, Footer, judul halaman, dan menu navigasi responsif.

---

## ⚡ 3. Menambahkan Fitur Bisnis Baru (Scaffolding Otomatis)

Jalankan perintah berikut di terminal:
```bash
pnpm run create:feature products
```

Script akan otomatis membuat folder fitur vertikal lengkap:
```text
src/features/products/
├── api/
│   └── products.api.ts         # Hook TanStack Query yang sudah divalidasi Valibot
├── components/
│   ├── products-list.tsx       # Komponen UI dengan status loading, error, dan empty state
│   └── __tests__/              # Folder pengujian unit & integrasi
├── hooks/                      # Custom hooks lokal fitur
├── stores/                     # Zustand store (opsional)
├── types/
│   └── products.schema.ts      # Skema data Valibot & TypeScript types
└── index.ts                    # Public export modul fitur
```

### Menghubungkan Fitur ke Route:
1. Buat file route di `src/app/routes/products.tsx`:
   ```tsx
   import { createRoute } from '@tanstack/react-router';
   import { rootRoute } from './root';
   import { ProductsList } from '@/features/products';

   export const productsRoute = createRoute({
     getParentRoute: () => rootRoute,
     path: '/products',
     component: () => (
       <div className="space-y-6">
         <h1 className="text-2xl font-bold text-slate-900">Katalog Produk</h1>
         <ProductsList />
       </div>
     ),
   });
   ```
2. Daftarkan route di `src/app/router.tsx`:
   ```tsx
   import { productsRoute } from './routes/products';

   const routeTree = rootRoute.addChildren([
     indexRoute,
     loginRoute,
     examplesRoute,
     productsRoute, // <-- Daftarkan di sini
   ]);
   ```

---

## 🛡️ 4. Menulis Skema Validasi dengan Valibot

Gunakan sintaks modular Valibot v1.x:
```typescript
import * as v from 'valibot';

export const CreateProductSchema = v.object({
  sku: v.pipe(v.string(), v.minLength(3, 'SKU minimal 3 karakter')),
  name: v.pipe(v.string(), v.nonEmpty('Nama produk wajib diisi')),
  price: v.pipe(v.number('Harga harus berupa angka'), v.minValue(1000, 'Harga minimal Rp 1.000')),
  category: v.picklist(['elektronik', 'pakaian', 'makanan']),
});

export type CreateProductInput = v.InferInput<typeof CreateProductSchema>;
export type Product = v.InferOutput<typeof CreateProductSchema>;
```

Untuk form input, hubungkan skema ke React Hook Form menggunakan `@hookform/resolvers/valibot`:
```tsx
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: valibotResolver(CreateProductSchema),
});
```

---

## 🧪 5. Testing & Verification

Jalankan rangkaian pengujian dan pengecekan kualitas:
```bash
# Type-checking TypeScript
pnpm run typecheck

# Linter ESLint Flat Config
pnpm run lint

# Jalankan Test Suite Vitest + MSW
pnpm run test

# Build Produksi
pnpm run build
```

---

## 🚢 6. Pilihan Deployment ke Produksi

### Opsi A: Static Hosting CDN (Disarankan)
- **Vercel / Cloudflare Pages / Netlify**:
  - Build command: `pnpm run build`
  - Output directory: `dist`
  - SPA Fallback: Ditangani otomatis oleh platform.

### Opsi B: Docker Container (Kubernetes, AWS ECS, GCP Cloud Run)
Template ini telah menyertakan `Dockerfile` multi-stage dan `nginx.conf`:
```bash
docker build -t my-frontend-app:latest .
docker run -p 8080:80 my-frontend-app:latest
```
Akses `http://localhost:8080`.
