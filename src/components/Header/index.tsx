'use client';

import Link from 'next/link';
import React from 'react';

import styles from './styles.module.scss';
import { useAuthStore, useUserStore } from '@/stores';
import { User } from '@/types';

type TProps = {
  user?: User | null;
};

export default function Header({ user: serverUser }: TProps) {
  const { logout } = useAuthStore();

  const handleLogout = () => logout();

  const user = serverUser || useUserStore((s) => s.user);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href='/' className={styles.logo}>
          DummyJSON Shop
        </Link>
        <nav className={styles.nav}>
          {!user ? (
            <Link href='/auth' className={styles.login}>
              Login
            </Link>
          ) : (
            <div className={styles.userWrapper}>
              {user.image && (
                <img
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  className={styles.avatar}
                />
              )}
              <span className={styles.user}>
                {user.firstName} {user.lastName}
              </span>
              <button className={styles.logout} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
