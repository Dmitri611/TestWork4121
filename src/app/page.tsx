'use client';

import React from 'react';

import { useProducts } from '@/hooks/useProducts';

import styles from './styles.module.scss';
import { ProductCard, Spinner } from '@/components';

export default function HomePage() {
  const { products, loading, error } = useProducts();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Products</h2>

      {loading && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.productsGrid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
