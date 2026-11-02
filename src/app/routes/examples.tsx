import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import { UserList } from '@/features/users/components/user-list';
import { PageHeader } from '@/shared/components/layout/page-header';
import { Badge } from '@/shared/components/ui/badge';

export const examplesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/examples',
  component: ExamplesPage,
});

function ExamplesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contoh Implementasi CRUD Fitur"
        description="Referensi implementasi Feature-Driven: TanStack Query + Validasi Valibot + Mock Service Worker (MSW)."
        actions={
          <Badge variant="secondary">Reference Slice</Badge>
        }
      />
      <UserList />
    </div>
  );
}
