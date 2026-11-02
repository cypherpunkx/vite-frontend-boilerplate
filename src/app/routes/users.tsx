import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import { UserList } from '@/features/users/components/user-list';

export const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: UsersPage,
});

function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manajemen Pengguna</h1>
        <p className="text-sm text-slate-600">
          Contoh modul integrasi data server-side dengan TanStack Query dan validasi Valibot
        </p>
      </div>
      <UserList />
    </div>
  );
}
