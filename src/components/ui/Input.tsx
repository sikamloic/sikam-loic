import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-white dark:bg-surface-800',
            'border border-surface-300 dark:border-surface-600',
            'text-surface-900 dark:text-white',
            'placeholder:text-surface-400 dark:placeholder:text-surface-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'transition-colors duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-accent-500 focus:ring-accent-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-accent-600 dark:text-accent-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
