import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { LoginForm } from '../login-form';

describe('LoginForm Component', () => {
  it('renders login fields properly', () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByRole('heading', { name: /Masuk ke Akun Anda/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Masuk/i })).toBeInTheDocument();
  });

  it('triggers Valibot schema validation errors when fields are empty or invalid', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    const submitBtn = screen.getByRole('button', { name: /Masuk/i });
    await user.click(submitBtn);

    // Valibot email & password validation error messages
    expect(await screen.findByText(/Email tidak boleh kosong/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password minimal harus 6 karakter/i)).toBeInTheDocument();

    // Invalid email format
    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, 'bukan-email-valid');
    await user.click(submitBtn);

    expect(await screen.findByText(/Format email tidak valid/i)).toBeInTheDocument();
  });

  it('submits form successfully and calls onSuccess when credentials are valid', async () => {
    const user = userEvent.setup();
    const handleSuccess = vi.fn();

    renderWithProviders(<LoginForm onSuccess={handleSuccess} />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Masuk/i });

    await user.type(emailInput, 'admin@example.com');
    await user.type(passwordInput, 'secret123');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(handleSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('displays API error message when credentials are wrong', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Masuk/i });

    await user.type(emailInput, 'salah@example.com');
    await user.type(passwordInput, 'wrongpass123');
    await user.click(submitBtn);

    expect(await screen.findByRole('alert')).toHaveTextContent(/Kredensial tidak valid/i);
  });
});
