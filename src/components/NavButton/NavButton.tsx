import * as React from 'react';
import styles from './NavButton.module.css';
import clsx from 'clsx';

type ButtonVariants = 'rounded' | 'outlined';

interface Props {
  label?: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: ButtonVariants;
  children?: React.ReactNode;
}

export const NavButton: React.FC<Props> = ({ label, onClick, disabled, variant, children, className }) => {
  const buttonClass = clsx(styles.button, {
    [styles['rounded-button']]: variant === 'rounded' || variant === 'outlined',
    [styles['outlined']]: variant === 'outlined',
  });

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {label}
      {children}
    </button>
  );
};
