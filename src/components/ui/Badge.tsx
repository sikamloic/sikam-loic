import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'neutral';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
  secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-300',
  accent: 'bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300',
  outline: 'border border-surface-300 text-surface-700 dark:border-surface-600 dark:text-surface-300',
  neutral: 'bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
