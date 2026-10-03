'use client';

import React, { Suspense, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { CheckCircle2, ArrowRight, Home, Download, Copy, ClipboardCheck } from 'lucide-react';

const NEXT_STEPS = [
  { step: 1, title: 'Application Received', desc: 'Your application has been recorded and assigned a reference number.', done: true },
  { step: 2, title: 'Documents Checked', desc: 'A document verification officer will check your uploaded files.', done: false },
  { step: 3, title: 'Officer Verification', desc: 'A Revenue Officer will review the details of your application.', done: false },
  { step: 4, title: 'Final Decision', desc: 'You will be notified when a decision has been made.', done: false },
];

function ConfirmationContent({ serviceId }: { serviceId: string }) {
  const searchParams = useSearchParams();
  const refNum = searchParams.get('ref') ?? 'ES-XXXX-XXXXX';
  const service = services.find(s => s.id === serviceId);
  const { language } = useApp();
  const [copied, setCopied] = useState(false);

  if (!service) return <Alert variant="error">Service not found.</Alert>;

  const title = language === 'ta' ? service.titleTa : language === 'hi' ? service.titleHi : service.title;

  const handleCopy = () => {
    navigator.clipboard.writeText(refNum).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <Card className="text-center py-10 mb-6 border-green-300 bg-green-50/40" shadow="md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5" aria-hidden="true">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h1>
        <p className="text-slate-600 mb-6">
          Your application for <strong>{title}</strong> has been successfully submitted.
        </p>

        <div className="bg-white border-2 border-green-300 rounded-xl p-4 inline-flex flex-col items-center gap-2 mx-auto mb-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Reference Number</p>
          <p className="text-2xl font-black text-navy-800 tracking-wide font-mono">{refNum}</p>
          <button
            onClick={handleCopy}
            className={cn(
              'flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors',
              copied ? 'bg-green-100 text-green-700' : 'text-gov-600 bg-gov-50 hover:bg-gov-100'
            )}
            aria-label="Copy reference number"
          >
            {copied ? <><ClipboardCheck size={13} /> Copied!</> : <><Copy size={13} /> Copy number</>}
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Save this number to track your application. You&apos;ll receive SMS updates on your registered mobile number.
        </p>
      </Card>

      <Alert variant="info" className="mb-6" role="status">
        <strong>No action required from you right now.</strong> We will contact you if anything is needed. Track your application anytime with your reference number.
      </Alert>

      <Card className="mb-6">
        <h2 className="font-bold text-slate-900 mb-4">What happens next?</h2>
        <ol className="space-y-4">
          {NEXT_STEPS.map(s => (
            <li key={s.step} className="flex items-start gap-3">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold',
                  s.done ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'
                )}
                aria-hidden="true"
              >
                {s.done ? <CheckCircle2 size={15} /> : s.step}
              </div>
              <div>
                <p className={cn('text-sm font-semibold', s.done ? 'text-green-800' : 'text-slate-700')}>{s.title}</p>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <div className="flex flex-col gap-3">
        <Link
          href={`/track?ref=${refNum}`}
          className={cn(
            'flex items-center justify-center gap-2 w-full px-5 py-4 rounded-xl',
            'bg-navy-800 text-white font-bold text-base shadow-sm',
            'hover:bg-navy-900 transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2',
            'min-h-[52px]'
          )}
        >
          Track My Application
          <ArrowRight size={18} aria-hidden="true" />
        </Link>

        <button
          className={cn(
            'flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl',
            'border-2 border-slate-200 text-slate-700 font-semibold',
            'hover:border-slate-300 hover:bg-slate-50 transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600',
            'min-h-[48px]'
          )}
          onClick={() => window.print()}
        >
          <Download size={16} aria-hidden="true" />
          Download Acknowledgement
        </button>

        <Link
          href="/home"
          className={cn(
            'flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl',
            'text-slate-600 font-medium hover:bg-slate-100 transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600',
            'min-h-[44px]'
          )}
        >
          <Home size={16} aria-hidden="true" />
          Return to Home
        </Link>
      </div>

      <p className="text-xs text-center text-slate-400 mt-6">
        Your application is recorded. Keep your reference number safe — you&apos;ll need it to track your application.
      </p>
    </>
  );
}

export default function ConfirmationPage() {
  const params = useParams();
  const serviceId = params.service as string;

  return (
    <PageLayout maxWidth="md">
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ConfirmationContent serviceId={serviceId} />
      </Suspense>
    </PageLayout>
  );
}
