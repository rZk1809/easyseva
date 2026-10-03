import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Language } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatRelative(iso: string): string {
  const now = new Date();
  const d = new Date(iso);
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(iso);
}

export function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(10000 + Math.random() * 90000);
  return `ES-${year}-${num}`;
}

export function formatFileSize(kb: number): string {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    draft: 'text-amber-700 bg-amber-50 border-amber-200',
    submitted: 'text-blue-700 bg-blue-50 border-blue-200',
    documents_verified: 'text-teal-700 bg-teal-50 border-teal-200',
    under_review: 'text-purple-700 bg-purple-50 border-purple-200',
    action_required: 'text-orange-700 bg-orange-50 border-orange-200',
    approved: 'text-green-700 bg-green-50 border-green-200',
    rejected: 'text-red-700 bg-red-50 border-red-200',
    completed: 'text-green-700 bg-green-50 border-green-200',
    in_progress: 'text-blue-700 bg-blue-50 border-blue-200',
    pending: 'text-slate-600 bg-slate-50 border-slate-200',
  };
  return map[status] ?? 'text-slate-600 bg-slate-50 border-slate-200';
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    draft: 'Draft',
    submitted: 'Submitted',
    documents_verified: 'Documents Verified',
    under_review: 'Under Review',
    action_required: 'Action Required',
    approved: 'Approved',
    rejected: 'Rejected',
  };
  return map[status] ?? status;
}

export function translate(
  obj: { en: string; ta: string; hi: string } | string,
  lang: Language
): string {
  if (typeof obj === 'string') return obj;
  return obj[lang] ?? obj.en;
}

export function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(`easyseva_${key}`, JSON.stringify(value));
  } catch {
    // Silently fail in SSR
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`easyseva_${key}`);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(`easyseva_${key}`);
  } catch {
    // Silently fail
  }
}
