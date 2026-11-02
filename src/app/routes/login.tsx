import { createRoute, useNavigate } from '@tanstack/react-router';
import { rootRoute } from './root';
import { LoginForm } from '@/features/auth/components/login-form';

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="py-12 flex items-center justify-center">
      <LoginForm onSuccess={() => navigate({ to: '/' })} />
    </div>
  );
}
