'use client';

import React, { useRef } from 'react';

import { useAuth } from '@/hooks/useAuth';

import styles from './styles.module.scss';
import { Button } from '@/components';
import { useAuthStore } from '@/stores';

export default function AuthPage() {
  const { login, loading } = useAuth();
  const error = useAuthStore((s) => s.error);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value.trim() || '';
    const password = passwordRef.current?.value.trim() || '';
    login(username, password);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Username
          <input ref={usernameRef} name='username' className={styles.input} />
        </label>

        <label className={styles.label}>
          Password
          <input
            ref={passwordRef}
            type='password'
            name='password'
            className={styles.input}
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <Button type='submit' loading={loading}>
          Login
        </Button>
      </form>
    </div>
  );
}
