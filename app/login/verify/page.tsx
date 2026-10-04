'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft, KeyRound, RefreshCw, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { trx } from '@/lib/translations';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const { language } = useApp();

  const email = searchParams.get('email') ?? '';
  const demoOtp = searchParams.get('demo') ?? '';

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleInput = (i: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[i] = digit;
    setCode(next);
    setError('');
    if (digit && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const fullCode = code.join('');

  const handleVerify = async () => {
    if (fullCode.length !== 6) return;
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: fullCode }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Verification failed.');
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        return;
      }

      setSuccess(true);
      await refreshUser();
      setTimeout(() => router.push('/home'), 1200);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setResendCooldown(60);
        setCode(['', '', '', '', '', '']);
        setError('');
        if (data.demoOtp) {
          router.replace(`/login/verify?email=${encodeURIComponent(email)}&demo=${data.demoOtp}`);
        }
      } else {
        setError(data.error ?? 'Could not resend OTP.');
      }
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="text-center">
        <p className="text-slate-500 mb-4">{trx('No email provided.', language)}</p>
        <Link href="/login" className="text-navy-700 font-semibold hover:underline">{trx('Go back to login', language)}</Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className={cn(
          'inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg',
          success ? 'bg-green-600' : 'bg-navy-800'
        )}>
          {success ? <CheckCircle2 size={32} className="text-white" /> : <KeyRound size={32} className="text-white" />}
        </div>
        <h1 className="text-2xl font-bold text-navy-900">
          {success ? trx('Verified!', language) : trx('Enter your OTP', language)}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          {success ? trx('Redirecting you to the dashboard…', language) : (
            <>{trx('We sent a 6-digit code to', language)} <strong>{email}</strong></>
          )}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
        {/* Demo OTP banner */}
        {demoOtp && !success && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-center">
            <p className="text-xs font-semibold text-amber-700 mb-1">{trx('Demo Mode — Your OTP', language)}</p>
            <p className="text-2xl font-black tracking-[0.5em] text-amber-900 font-mono">{demoOtp}</p>
            <p className="text-xs text-amber-600 mt-1">{trx('This is shown here because email is not configured.', language)}</p>
          </div>
        )}

        {/* OTP Input */}
        <div className="flex gap-2 justify-center mb-5" onPaste={handlePaste}>
          {code.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleInput(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              aria-label={`OTP digit ${i + 1}`}
              className={cn(
                'w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700',
                error ? 'border-red-400 bg-red-50 text-red-700' :
                  digit ? 'border-navy-400 bg-navy-50 text-navy-900' :
                    'border-slate-200 text-slate-900'
              )}
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center mb-4" role="alert">{error}</p>
        )}

        <button
          onClick={handleVerify}
          disabled={loading || fullCode.length !== 6 || success}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl',
            'bg-navy-800 text-white font-bold text-sm min-h-[52px]',
            'hover:bg-navy-900 transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2',
            'disabled:opacity-60 disabled:cursor-not-allowed'
          )}
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> {trx('Verifying…', language)}</>
          ) : success ? (
            <><CheckCircle2 size={16} /> {trx('Verified!', language)}</>
          ) : (
            trx('Verify & Sign In', language)
          )}
        </button>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
          <Link
            href="/login"
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 font-medium"
          >
            <ArrowLeft size={13} /> {trx('Back', language)}
          </Link>
          <button
            onClick={handleResend}
            disabled={resending || resendCooldown > 0}
            className="flex items-center gap-1 text-xs text-gov-600 hover:text-gov-700 font-medium disabled:opacity-50"
          >
            <RefreshCw size={13} className={resending ? 'animate-spin' : ''} />
            {resendCooldown > 0 ? `${trx('Resend OTP', language)} (${resendCooldown}s)` : resending ? trx('Sending OTP…', language) : trx('Resend OTP', language)}
          </button>
        </div>
      </div>
    </>
  );
}

export default function VerifyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-50 to-gov-50 px-4 py-12">
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="text-center text-slate-400">Loading…</div>}>
          <VerifyContent />
        </Suspense>
        <p className="text-center text-xs text-slate-400 mt-6">
          This is an HCI academic prototype. No real government data is stored.
        </p>
      </div>
    </main>
  );
}
