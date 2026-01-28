import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary-600 text-white
    hover:bg-primary-700
    focus:ring-primary-500
    dark:bg-primary-500 dark:hover:bg-primary-600
  `,
  secondary: `
    bg-secondary-600 text-white
    hover:bg-secondary-700
    focus:ring-secondary-500
    dark:bg-secondary-500 dark:hover:bg-secondary-600
  `,
  accent: `
    bg-accent-600 text-white
    hover:bg-accent-700
    focus:ring-accent-500
    dark:bg-accent-500 dark:hover:bg-accent-600
  `,
  outline: `
    border-2 border-primary-600 text-primary-600
    hover:bg-primary-50
    focus:ring-primary-500
    dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950
  `,
  ghost: `
    text-surface-700
    hover:bg-surface-100
    focus:ring-surface-500
    dark:text-surface-300 dark:hover:bg-surface-800
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-medium rounded-lg',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
