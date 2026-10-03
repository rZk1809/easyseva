'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to send OTP.');
        return;
      }

      // Pass email and demo OTP (if returned) to verify page
      const params = new URLSearchParams({ email });
      if (data.demoOtp) params.set('demo', data.demoOtp);
      router.push(`/login/verify?${params.toString()}`);
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-50 to-gov-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-800 rounded-2xl mb-4 shadow-lg">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-navy-900">Sign in to EasySeva</h1>
          <p className="text-slate-500 mt-1 text-sm">
            We&apos;ll send a one-time code to your email
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={cn(
                    'w-full pl-9 pr-4 py-3 rounded-xl border text-slate-900 text-sm',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700',
                    error ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'
                  )}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl',
                'bg-navy-800 text-white font-bold text-sm',
                'hover:bg-navy-900 transition-colors min-h-[52px]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2',
                'disabled:opacity-60 disabled:cursor-not-allowed'
              )}
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Sending OTP…</>
              ) : (
                <>Send OTP <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
            By continuing, you agree to our{' '}
            <Link href="/help" className="underline hover:text-slate-600">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/help" className="underline hover:text-slate-600">Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          This is an HCI academic prototype. No real government data is stored.
        </p>
      </div>
    </main>
  );
}
