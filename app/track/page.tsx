'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Skeleton } from '@/components/ui/Skeleton';
import { ApplicationTimeline } from '@/components/features/ApplicationTimeline';
import { formatDate } from '@/lib/utils';
import { Search, AlertTriangle, ExternalLink } from 'lucide-react';
import type { Application } from '@/lib/types';

function TrackContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') ?? '';
  const [query, setQuery] = useState(initialRef);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Application | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/applications/track?ref=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setResult(data.application ?? null);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Auto-search if ref is pre-filled from URL
  React.useEffect(() => {
    if (initialRef) {
      const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSearch(syntheticEvent);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card className="mb-6">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <Input
            label="Reference Number"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. ES-2026-34521"
            helperText="Your reference number was shown after submitting. It starts with ES-."
            required
          />
          <Button type="submit" variant="primary" size="md" fullWidth iconLeft={<Search size={16} />} disabled={loading}>
            {loading ? 'Searching…' : 'Track Application'}
          </Button>
        </form>
      </Card>

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      )}

      {searched && !loading && !result && (
        <Alert variant="warning">
          <strong>Application not found.</strong> Please check your reference number and try again. Make sure to enter it exactly as shown — for example, ES-2026-34521.
        </Alert>
      )}

      {result && !loading && (
        <div className="space-y-5 animate-fade-in-up">
          <Card>
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{result.serviceName}</h2>
                <p className="text-sm font-mono text-slate-500">{result.referenceNumber}</p>
              </div>
              <StatusBadge status={result.status} />
            </div>

            {result.status === 'action_required' && (
              <Alert variant="warning" className="mb-3">
                <strong>Your action is needed.</strong> Please review the timeline below for details.
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm mt-3 pt-3 border-t border-slate-100">
              {result.submittedAt && (
                <div>
                  <p className="text-slate-500">Submitted</p>
                  <p className="font-semibold text-slate-800">{formatDate(result.submittedAt)}</p>
                </div>
              )}
              <div>
                <p className="text-slate-500">Last Updated</p>
                <p className="font-semibold text-slate-800">{formatDate(result.lastUpdated)}</p>
              </div>
            </div>
          </Card>

          {result.timeline.length > 0 && (
            <Card>
              <h3 className="font-bold text-slate-900 mb-5">Application Progress</h3>
              <ApplicationTimeline steps={result.timeline} />
            </Card>
          )}

          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-blue-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">What this means for you</p>
                <p className="text-sm text-blue-800">
                  {result.status === 'submitted' && 'Your application has been received. We will start processing it soon.'}
                  {result.status === 'documents_verified' && 'Your documents have been checked and are in order.'}
                  {result.status === 'under_review' && 'Your application is being reviewed by an officer. No action is needed from you right now.'}
                  {result.status === 'action_required' && 'We need something from you. Please check the timeline above for details.'}
                  {result.status === 'approved' && 'Congratulations! Your application has been approved.'}
                  {result.status === 'rejected' && 'Unfortunately, your application was not approved. See the reason in the timeline above.'}
                </p>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Link
              href="/applications"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gov-600 hover:text-gov-800"
            >
              View all my applications <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default function TrackPage() {
  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Track Your Application"
        description="Enter your application reference number to see the current status."
        backHref="/home"
      />
      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <TrackContent />
      </Suspense>
    </PageLayout>
  );
}
