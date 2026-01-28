import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils';
import { Container } from './Container';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: 'default' | 'muted' | 'primary';
}

const backgroundStyles = {
  default: 'bg-transparent',
  muted: 'bg-surface-100 dark:bg-surface-900',
  primary: 'bg-primary-50 dark:bg-primary-950',
};

export function Section({
  children,
  title,
  subtitle,
  containerSize = 'xl',
  background = 'default',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn('py-16 md:py-24', backgroundStyles[background], className)}
      {...props}
    >
      <Container size={containerSize}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
