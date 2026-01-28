import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const variantStyles = {
  default: 'bg-white dark:bg-surface-900',
  bordered: 'bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700',
  elevated: 'bg-white dark:bg-surface-900 shadow-lg dark:shadow-surface-950/50',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  variant = 'bordered',
  padding = 'none',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-surface-200 dark:border-surface-700', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...props }: CardBodyProps) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-surface-200 dark:border-surface-700', className)}
      {...props}
    >
      {children}
    </div>
  );
}
