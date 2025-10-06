import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import api from '@/services/api';

import { useAuthStore, useUserStore } from '@/stores';

export const useAuth = () => {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const setLoading = useAuthStore((s) => s.setLoading);
  const setError = useAuthStore((s) => s.setError);
  const fetchUser = useUserStore((s) => s.fetchUser);

  const loading = useAuthStore((s) => s.loading);

  const login = useCallback(
    async (username: string, password: string) => {
      if (username.length < 3 || password.length < 3) {
        setError('Username and password must be at least 3 characters');
        return;
      }

      try {
        setLoading(true);
        const res = await api.post('/auth/login', { username, password });
        const data = res.data;

        if (!data?.accessToken || !data?.refreshToken) {
          setError('No tokens returned from API');
          return;
        }

        setAuth(data.accessToken, data.refreshToken);

        await fetchUser();

        router.push('/');
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading, setError, fetchUser, router],
  );

  return { login, loading };
};
