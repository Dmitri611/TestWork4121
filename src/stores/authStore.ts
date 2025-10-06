import Cookies from 'js-cookie';
import { create } from 'zustand';

import useUserStore from './userStore';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;

  setAuth: (token: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
}

const TOKEN_KEY = 'token';
const REFRESH_KEY = 'refreshToken';
const isClient = typeof window !== 'undefined';

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  refreshToken: null,
  loading: false,
  error: null,

  setAuth: (token, refreshToken) => {
    set({ token, refreshToken, error: null });
    if (isClient) {
      Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'strict' });
      Cookies.set(REFRESH_KEY, refreshToken, {
        expires: 7,
        sameSite: 'strict',
      });
    }
  },

  logout: () => {
    set({ token: null, refreshToken: null });
    if (isClient) {
      Cookies.remove(TOKEN_KEY);
      Cookies.remove(REFRESH_KEY);
    }
    useUserStore.setState({ user: null });
  },

  setLoading: (value) => set({ loading: value }),
  setError: (error) => set({ error }),
}));

export default useAuthStore;
