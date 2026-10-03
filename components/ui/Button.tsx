import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-navy-800 text-white hover:bg-navy-900 active:bg-navy-950 focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 disabled:bg-slate-300 disabled:text-slate-500',
  secondary:
    'bg-gov-600 text-white hover:bg-gov-700 active:bg-gov-800 focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2 disabled:bg-slate-300 disabled:text-slate-500',
  outline:
    'border-2 border-navy-800 text-navy-800 bg-white hover:bg-navy-50 active:bg-navy-100 focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 disabled:border-slate-300 disabled:text-slate-500',
  ghost:
    'text-navy-800 bg-transparent hover:bg-navy-50 active:bg-navy-100 focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-1 disabled:text-slate-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:bg-slate-300 disabled:text-slate-500',
  success:
    'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:bg-slate-300 disabled:text-slate-500',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5 rounded-md min-h-[36px]',
  md: 'px-4 py-2.5 text-base gap-2 rounded-lg min-h-[44px]',
  lg: 'px-6 py-3 text-lg gap-2.5 rounded-xl min-h-[52px]',
  xl: 'px-8 py-4 text-xl gap-3 rounded-2xl min-h-[60px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-colors duration-150 cursor-pointer select-none',
        'focus:outline-none focus-visible:outline-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'cursor-not-allowed opacity-70',
        className
      )}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <Loader2 className="animate-spin shrink-0" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : (
        iconLeft && <span className="shrink-0">{iconLeft}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}
