import { create } from 'zustand';

import useAuthStore from './authStore';
import { User } from '@/types';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: 'No access token', user: null });
      return;
    }

    set({ loading: true, error: null });

    try {
      const res = await fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data: User = await res.json();
      set({ user: data });
    } catch (err: any) {
      set({ error: err.message, user: null });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;
