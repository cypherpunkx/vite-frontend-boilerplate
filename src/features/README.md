# Panduan Konvensi Feature-Driven (Vertical Slices)

Setiap fitur bisnis baru harus ditempatkan sebagai folder mandiri di dalam `src/features/[feature-name]`. Struktur ini memisahkan kekhawatiran (*separation of concerns*) berdasarkan domain bisnis, bukan peran teknis.

---

## 📁 Struktur Standar Sebuah Fitur

```text
src/features/[feature-name]/
├── api/                       # Pemanggilan Axios & TanStack Query hooks
│   └── [feature].api.ts
├── components/                # Komponen UI spesifik untuk fitur ini
│   ├── [feature]-list.tsx
│   ├── [feature]-form.tsx
│   └── __tests__/             # Unit / Integration test komponen
├── hooks/                     # Custom React hooks lokal untuk fitur ini
├── stores/                    # Zustand store (jika fitur membutuhkan client state)
├── types/                     # Skema Valibot & Inferensi TypeScript
│   └── [feature].schema.ts
└── index.ts                   # Public API export fitur
```

---

## 📝 4 Aturan Utama

1. **Valibot First**: Selalu definisikan skema data terlebih dahulu di `types/[feature].schema.ts` menggunakan modular syntax Valibot (`v.object`, `v.pipe`, `v.string()`, dll). Infer tipe menggunakan `v.InferOutput<typeof Schema>`.
2. **Server State via TanStack Query**: Jangan menyimpan data API di Zustand. Gunakan `useQuery` atau `useMutation` di dalam folder `api/`.
3. **Isolasi Fitur**: Fitur hanya boleh mengimpor dari `src/shared/*` atau public export fitur lain. Hindari *deep import* ke internal folder fitur lain (`import { x } from '@/features/other/internal/...'`).
4. **Testing Dekat dengan Kode**: Buat pengujian di folder `__tests__/` di samping komponen yang diuji, memanfaatkan MSW untuk mock request jaringan.
