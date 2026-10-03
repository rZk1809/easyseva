'use client';

import React, { useState } from 'react';
import { CreditCard, Lock, CheckCircle2, Loader2, X, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentIntentId: string) => void;
  amount: number; // in paise (₹1 = 100 paise)
  serviceName: string;
  applicationId?: string;
}

const TEST_CARDS = [
  { number: '4111 1111 1111 1111', label: 'Visa (Success)', type: 'success' },
  { number: '4000 0000 0000 0002', label: 'Declined', type: 'error' },
];

export function PaymentModal({ isOpen, onClose, onSuccess, amount, serviceName, applicationId }: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [paymentIntentId, setPaymentIntentId] = useState('');

  const amountRupees = (amount / 100).toFixed(2);

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const rawCard = cardNumber.replace(/\s/g, '');
    if (rawCard.length < 16) { setError('Enter a valid 16-digit card number.'); return; }
    if (expiry.length < 5) { setError('Enter expiry as MM/YY.'); return; }
    if (cvv.length < 3) { setError('Enter a 3 or 4 digit CVV.'); return; }
    if (!name.trim()) { setError('Enter the cardholder name.'); return; }

    // Check test card for decline
    if (rawCard === '4000000000000002') {
      setError('Your card was declined. Please use a different card.');
      return;
    }

    setLoading(true);
    setStep('processing');

    try {
      const res = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'inr', applicationId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Payment failed.');
        setStep('form');
        return;
      }

      // Simulate payment processing
      await new Promise(res => setTimeout(res, 1500));

      // Confirm payment
      await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentIntentId: data.paymentIntentId, applicationId }),
      });

      setPaymentIntentId(data.paymentIntentId);
      setStep('success');
      setTimeout(() => onSuccess(data.paymentIntentId), 1500);
    } catch {
      setError('Network error. Please try again.');
      setStep('form');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Payment"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeInUp_0.2s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-green-600" />
            <span className="font-bold text-slate-900">Secure Payment</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Amount banner */}
        <div className="bg-navy-50 px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-slate-600">{serviceName}</span>
          <span className="text-xl font-black text-navy-900">₹{amountRupees}</span>
        </div>

        <div className="px-6 py-5">
          {step === 'processing' && (
            <div className="text-center py-10">
              <Loader2 size={40} className="animate-spin text-navy-700 mx-auto mb-4" />
              <p className="font-semibold text-slate-800">Processing payment…</p>
              <p className="text-sm text-slate-500 mt-1">Please do not close this window.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-10">
              <CheckCircle2 size={48} className="text-green-600 mx-auto mb-4" />
              <p className="font-bold text-slate-900 text-lg">Payment successful!</p>
              <p className="text-sm text-slate-500 mt-1">₹{amountRupees} paid</p>
              {paymentIntentId && (
                <p className="text-xs text-slate-400 mt-2 font-mono">{paymentIntentId}</p>
              )}
            </div>
          )}

          {step === 'form' && (
            <>
              {/* Test card hint */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 flex gap-2">
                <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-700">
                  <p className="font-semibold mb-0.5">Demo Mode — use a test card:</p>
                  {TEST_CARDS.map(c => (
                    <button
                      key={c.number}
                      type="button"
                      onClick={() => setCardNumber(c.number)}
                      className="block font-mono hover:underline"
                    >
                      {c.number} <span className="font-sans not-italic">({c.label})</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Card number</label>
                  <div className="relative">
                    <CreditCard size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={e => setCardNumber(formatCard(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Expiry</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={expiry}
                      onChange={e => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">CVV</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cvv}
                      onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Cardholder name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="As printed on card"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600" role="alert">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl',
                    'bg-navy-800 text-white font-bold text-sm min-h-[52px]',
                    'hover:bg-navy-900 transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2',
                    'disabled:opacity-60'
                  )}
                >
                  <Lock size={14} />
                  Pay ₹{amountRupees}
                </button>
              </form>

              <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                <Lock size={11} /> Secured by dummy Stripe (demo only)
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
