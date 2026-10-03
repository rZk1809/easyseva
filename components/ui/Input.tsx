'use client';

import React, { useState, useId } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Eye, EyeOff, ChevronDown } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  example?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
}

export function Input({
  label,
  helperText,
  error,
  success,
  example,
  required,
  showPasswordToggle,
  className,
  type = 'text',
  id: providedId,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
        {!required && <span className="text-slate-500 text-xs font-normal ml-1.5">(optional)</span>}
      </label>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          required={required}
          aria-describedby={
            [error ? errorId : null, helperText ? helperId : null]
              .filter(Boolean)
              .join(' ') || undefined
          }
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            'w-full px-3.5 py-2.5 text-slate-900 bg-white rounded-lg border-2 transition-colors duration-150',
            'placeholder:text-slate-400 focus:outline-none',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : success
              ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-100'
              : 'border-slate-300 focus:border-gov-600 focus:ring-2 focus:ring-gov-100',
            showPasswordToggle && 'pr-11',
            className
          )}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {success && !showPasswordToggle && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={18} aria-hidden="true" />
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="flex items-start gap-1.5 text-sm text-red-600">
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="text-sm text-slate-500">
          {helperText}
        </p>
      )}

      {!error && example && (
        <p className="text-xs text-slate-400">
          <span className="font-medium">Example:</span> {example}
        </p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  helperText?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function Select({
  label,
  options,
  helperText,
  error,
  required,
  placeholder = 'Choose one…',
  className,
  id: providedId,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
        {!required && <span className="text-slate-500 text-xs font-normal ml-1.5">(optional)</span>}
      </label>

      <div className="relative">
        <select
          id={id}
          required={required}
          aria-describedby={
            [error ? errorId : null, helperText ? helperId : null]
              .filter(Boolean)
              .join(' ') || undefined
          }
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            'w-full appearance-none px-3.5 py-2.5 pr-10 text-slate-900 bg-white rounded-lg border-2 transition-colors duration-150',
            'focus:outline-none cursor-pointer',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-slate-300 focus:border-gov-600 focus:ring-2 focus:ring-gov-100',
            className
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          size={18}
          aria-hidden="true"
        />
      </div>

      {error && (
        <p id={errorId} role="alert" className="flex items-start gap-1.5 text-sm text-red-600">
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export function Textarea({
  label,
  helperText,
  error,
  required,
  className,
  id: providedId,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
        {!required && <span className="text-slate-500 text-xs font-normal ml-1.5">(optional)</span>}
      </label>
      <textarea
        id={id}
        required={required}
        rows={4}
        aria-invalid={error ? 'true' : undefined}
        className={cn(
          'w-full px-3.5 py-2.5 text-slate-900 bg-white rounded-lg border-2 transition-colors duration-150 resize-none',
          'placeholder:text-slate-400 focus:outline-none',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-slate-300 focus:border-gov-600 focus:ring-2 focus:ring-gov-100',
          className
        )}
        {...props}
      />
      {error && (
        <p role="alert" className="flex items-start gap-1.5 text-sm text-red-600">
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
}
