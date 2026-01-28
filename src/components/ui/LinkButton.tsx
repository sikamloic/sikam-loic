import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseLinkButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

type InternalLinkButtonProps = BaseLinkButtonProps & LinkProps;

type ExternalLinkButtonProps = BaseLinkButtonProps & 
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    external: true;
    href: string;
  };

type LinkButtonProps = InternalLinkButtonProps | ExternalLinkButtonProps;

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

function isExternalLink(props: LinkButtonProps): props is ExternalLinkButtonProps {
  return 'external' in props && props.external === true;
}

export function LinkButton(props: LinkButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    leftIcon,
    rightIcon,
    className,
    ...rest
  } = props;

  const classes = cn(
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (isExternalLink(props)) {
    const { external, href, ...anchorProps } = rest as ExternalLinkButtonProps;
    return (
      <a
        href={href}
        className={classes}
        {...anchorProps}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    );
  }

  const linkProps = rest as Omit<InternalLinkButtonProps, keyof BaseLinkButtonProps>;
  return (
    <Link className={classes} {...linkProps}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  );
}
