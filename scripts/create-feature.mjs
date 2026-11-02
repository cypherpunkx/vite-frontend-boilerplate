#!/usr/bin/env node

/**
 * Script otomatis untuk men-generate boilerplate fitur baru (Vertical Slice)
 * Penggunaan: node scripts/create-feature.mjs <feature-name>
 * Contoh: node scripts/create-feature.mjs products
 */

import fs from 'node:fs';
import path from 'node:path';

const featureName = process.argv[2];

if (!featureName) {
  console.error('❌ Mohon berikan nama fitur.');
  console.log('Penggunaan: pnpm run create:feature <feature-name>');
  console.log('Contoh: pnpm run create:feature products');
  process.exit(1);
}

const sanitizedName = featureName.toLowerCase().replace(/[^a-z0-9-]/g, '');
const targetDir = path.resolve(process.cwd(), 'src', 'features', sanitizedName);

if (fs.existsSync(targetDir)) {
  console.error(`❌ Fitur "${sanitizedName}" sudah ada di: ${targetDir}`);
  process.exit(1);
}

// Buat direktori
const dirs = [
  '',
  'api',
  'components',
  'components/__tests__',
  'hooks',
  'stores',
  'types',
];

for (const dir of dirs) {
  fs.mkdirSync(path.join(targetDir, dir), { recursive: true });
}

const capitalized = sanitizedName.charAt(0).toUpperCase() + sanitizedName.slice(1);

// 1. types/<feature>.schema.ts
const schemaContent = `import * as v from 'valibot';

/**
 * Valibot schema untuk ${capitalized}
 */
export const ${capitalized}ItemSchema = v.object({
  id: v.string(),
  title: v.pipe(v.string(), v.minLength(1, 'Judul tidak boleh kosong')),
  createdAt: v.string(),
});

export type ${capitalized}Item = v.InferOutput<typeof ${capitalized}ItemSchema>;

export const ${capitalized}ListResponseSchema = v.object({
  items: v.array(${capitalized}ItemSchema),
  total: v.number(),
});

export type ${capitalized}ListResponse = v.InferOutput<typeof ${capitalized}ListResponseSchema>;
`;

// 2. api/<feature>.api.ts
const apiContent = `import { useQuery } from '@tanstack/react-query';
import * as v from 'valibot';
import { apiClient } from '@/shared/lib/api-client';
import {
  ${capitalized}ListResponseSchema,
  type ${capitalized}ListResponse,
} from '../types/${sanitizedName}.schema';

export const ${sanitizedName}Keys = {
  all: ['${sanitizedName}'] as const,
  lists: () => [...${sanitizedName}Keys.all, 'list'] as const,
};

export function use${capitalized}ListQuery() {
  return useQuery({
    queryKey: ${sanitizedName}Keys.lists(),
    queryFn: async (): Promise<${capitalized}ListResponse> => {
      const response = await apiClient.get('/${sanitizedName}');
      const parsed = v.safeParse(${capitalized}ListResponseSchema, response.data);

      if (!parsed.success) {
        console.error('Validation error:', parsed.issues);
        throw new Error('Data server ${sanitizedName} tidak valid.');
      }

      return parsed.output;
    },
  });
}
`;

// 3. components/<feature>-list.tsx
const componentContent = `import { use${capitalized}ListQuery } from '../api/${sanitizedName}.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Spinner } from '@/shared/components/ui/spinner';
import { EmptyState } from '@/shared/components/ui/empty-state';

export function ${capitalized}List() {
  const { data, isLoading, isError, error } = use${capitalized}ListQuery();

  if (isLoading) {
    return <Spinner label="Memuat data ${sanitizedName}..." />;
  }

  if (isError) {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
        <p className="font-semibold">Terjadi kesalahan</p>
        <p className="text-sm mt-1">{(error as Error)?.message}</p>
      </div>
    );
  }

  if (!data?.items.length) {
    return (
      <EmptyState
        title="Belum ada data ${sanitizedName}"
        description="Data ${sanitizedName} akan muncul di sini setelah ditambahkan."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar ${capitalized}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-slate-200">
          {data.items.map((item) => (
            <li key={item.id} className="py-3 flex justify-between items-center">
              <span className="font-medium text-slate-800">{item.title}</span>
              <span className="text-xs text-slate-400">{item.createdAt}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
`;

// 4. index.ts
const indexContent = `export * from './types/${sanitizedName}.schema';
export * from './api/${sanitizedName}.api';
export * from './components/${sanitizedName}-list';
`;

fs.writeFileSync(path.join(targetDir, 'types', `${sanitizedName}.schema.ts`), schemaContent);
fs.writeFileSync(path.join(targetDir, 'api', `${sanitizedName}.api.ts`), apiContent);
fs.writeFileSync(path.join(targetDir, 'components', `${sanitizedName}-list.tsx`), componentContent);
fs.writeFileSync(path.join(targetDir, 'index.ts'), indexContent);

console.log(`✅ Modul fitur "${sanitizedName}" berhasil dibuat di src/features/${sanitizedName}/`);
console.log('Struktur yang dibuat:');
console.log(`  ├── types/${sanitizedName}.schema.ts (Valibot schema & TypeScript types)`);
console.log(`  ├── api/${sanitizedName}.api.ts (TanStack Query hooks)`);
console.log(`  ├── components/${sanitizedName}-list.tsx (React UI component)`);
console.log(`  └── index.ts (Public barrel export)`);
