'use client';

import React from 'react';

import styles from './styles.module.scss';
import { useUserStore } from '@/stores';
import { User } from '@/types';

type TProps = {
  user?: User | null;
};

export default function Footer({ user: serverUser }: TProps) {
  const year = new Date().getFullYear();
  const user = serverUser || useUserStore((s) => s.user);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.year}>© {year}</span>
        {user && <span className={styles.logged}>Logged as {user.email}</span>}
      </div>
    </footer>
  );
}
