'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { services } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { DocumentUpload } from '@/components/features/DocumentUpload';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { ProgressBar } from '@/components/ui/Progress';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trx } from '@/lib/translations';

export default function DocumentsPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.service as string;
  const service = services.find(s => s.id === serviceId);
  const { language, uploadedDocs } = useApp();

  if (!service) return <PageLayout><Alert variant="error">Service not found.</Alert></PageLayout>;

  const title = language === 'ta' ? service.titleTa : language === 'hi' ? service.titleHi : service.title;
  const uploaded = uploadedDocs[serviceId] ?? [];
  const required = service.documents.filter(d => d.required);
  const uploadedRequired = required.filter(doc => uploaded.some(u => u.requirementId === doc.id));
  const allRequiredUploaded = uploadedRequired.length === required.length;
  const progress = required.length > 0 ? Math.round((uploadedRequired.length / required.length) * 100) : 100;

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Check Your Documents"
        description="Let's make sure you have everything ready before filling the form."
        backHref={`/apply/${serviceId}/eligibility`}
        backLabel="Back to eligibility"
      />

      <ProgressBar
        value={progress}
        showPercent
        label={`${uploadedRequired.length} ${trx('of', language)} ${required.length} ${trx('required documents ready', language)}`}
        color={allRequiredUploaded ? 'success' : 'primary'}
        className="mb-6"
      />

      {allRequiredUploaded && (
        <Alert variant="success" className="mb-6" role="status">
          <strong>{trx('All required documents are ready.', language)}</strong> {trx('You can now continue to the application form.', language)}
        </Alert>
      )}

      <div className="space-y-4 mb-8">
        {service.documents.map(doc => (
          <DocumentUpload key={doc.id} serviceId={serviceId} requirement={doc} />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          iconRight={<ArrowRight size={18} />}
          onClick={() => router.push(`/apply/${serviceId}/form`)}
        >
          {allRequiredUploaded ? trx('Continue to Application Form', language) : trx('Continue (upload documents later)', language)}
        </Button>
        <Button
          variant="ghost"
          size="md"
          fullWidth
          onClick={() => router.push('/home')}
        >
          {trx('Save and Finish Later', language)}
        </Button>
      </div>

      <p className="text-xs text-slate-400 text-center mt-4">
        {trx('Your progress is automatically saved. You can return to this step anytime.', language)}
      </p>
    </PageLayout>
  );
}
