import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padBottom?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
  '2xl': 'max-w-6xl',
  full: 'max-w-full',
};

export function PageLayout({ children, className, maxWidth = 'xl', padBottom = true }: PageLayoutProps) {
  return (
    <main
      id="main-content"
      className={cn(
        'flex-1 w-full mx-auto px-4 sm:px-6 py-6 sm:py-8',
        maxWidthClasses[maxWidth],
        padBottom && 'pb-24 lg:pb-8',
        className
      )}
    >
      {children}
    </main>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, backHref, backLabel = 'Back', actions, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6 sm:mb-8', className)}>
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-navy-800 mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded-lg px-1 py-0.5 -ml-1"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          {backLabel}
        </Link>
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{title}</h1>
          {description && (
            <p className="mt-1.5 text-slate-600 text-base sm:text-lg">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export function SectionHeader({ title, description, className }: { title: string; description?: string; className?: string }) {
  return (
    <div className={cn('mb-4', className)}>
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      {description && <p className="text-sm text-slate-600 mt-0.5">{description}</p>}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-slate-200', className)} />;
}
