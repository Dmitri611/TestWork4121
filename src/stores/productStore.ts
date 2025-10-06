import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import api from '@/services/api';

import { Product } from '@/types';

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasLoaded: boolean;
  fetchProducts: () => Promise<void>;
};

const useProductStore = create<ProductState>()(
  subscribeWithSelector((set, get) => ({
    products: [],
    loading: false,
    error: null,
    hasLoaded: false,

    fetchProducts: async () => {
      if (get().hasLoaded || get().loading) return;

      set({ loading: true, error: null });
      try {
        const res = await api.get('/products?limit=12');
        set({
          products: res.data?.products || [],
          hasLoaded: true,
        });
      } catch (e) {
        set({ error: 'Failed to load products' });
      } finally {
        set({ loading: false });
      }
    },
  })),
);

export default useProductStore;
