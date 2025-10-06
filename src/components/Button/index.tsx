'use client';

import React, { ButtonHTMLAttributes } from 'react';

import Spinner from '../Spinner';

import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  ...props
}) => {
  return (
    <button
      className={styles.button}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
