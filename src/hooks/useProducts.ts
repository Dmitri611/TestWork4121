import { useEffect } from 'react';

import { useProductStore } from '@/stores';

export const useProducts = () => {
  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);
  const error = useProductStore((s) => s.error);
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error };
};
