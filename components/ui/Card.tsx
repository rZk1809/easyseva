import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'section' | 'li';
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
};

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

export function Card({
  children,
  className,
  padding = 'md',
  border = true,
  shadow = 'sm',
  as: Tag = 'div',
  onClick,
  ...rest
}: CardProps) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl',
        border && 'border border-slate-200',
        paddingClasses[padding],
        shadowClasses[shadow],
        onClick && 'cursor-pointer hover:border-gov-300 hover:shadow-md transition-all duration-150',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-4', className)}>{children}</div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn('text-lg font-bold text-slate-900', className)}>{children}</h2>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-sm text-slate-600 mt-1', className)}>{children}</p>
  );
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-slate-100', className)}>{children}</div>
  );
}
