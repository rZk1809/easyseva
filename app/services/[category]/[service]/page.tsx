'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';
import {
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  IndianRupee,
  List,
} from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.service as string;
  const service = services.find(s => s.id === serviceId);
  const { language } = useApp();
  const [showAllDocs, setShowAllDocs] = useState(false);

  if (!service) {
    return (
      <PageLayout>
        <Alert variant="error">Service not found.</Alert>
      </PageLayout>
    );
  }

  const title = language === 'ta' ? service.titleTa : language === 'hi' ? service.titleHi : service.title;
  const shortDesc = language === 'ta' ? service.shortDescriptionTa : language === 'hi' ? service.shortDescriptionHi : service.shortDescription;
  const docsToShow = showAllDocs ? service.documents : service.documents.slice(0, 2);

  return (
    <PageLayout maxWidth="lg">
      <PageHeader
        title={title}
        description={shortDesc}
        backHref={`/services/${service.categoryId}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* What is it */}
          <Card>
            <h2 className="text-base font-bold text-slate-900 mb-2">What is this service?</h2>
            <p className="text-slate-600 leading-relaxed">{service.fullDescription}</p>

            {service.usedFor.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">You may need this for:</p>
                <ul className="space-y-1.5">
                  {service.usedFor.map((use, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={15} className="text-teal-600 mt-0.5 shrink-0" aria-hidden="true" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          {/* Documents required */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-gov-600" aria-hidden="true" />
              <h2 className="text-base font-bold text-slate-900">Documents you will need</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Collect these before you start. It will make the process much faster.
            </p>
            <div className="space-y-3">
              {docsToShow.map((doc, i) => (
                <div key={doc.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-7 h-7 rounded-full bg-gov-100 flex items-center justify-center shrink-0 text-xs font-bold text-gov-700" aria-hidden="true">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {doc.name}
                      {doc.required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.description}</p>
                    <p className="text-xs text-slate-400 mt-1">{doc.accepted.join(', ')} · Max {doc.maxSizeMB} MB</p>
                  </div>
                </div>
              ))}
            </div>
            {service.documents.length > 2 && (
              <button
                onClick={() => setShowAllDocs(v => !v)}
                className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-gov-600 hover:text-gov-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded"
                aria-expanded={showAllDocs}
              >
                {showAllDocs ? (
                  <><ChevronUp size={15} /> Show fewer</>
                ) : (
                  <><ChevronDown size={15} /> See all {service.documents.length} documents</>
                )}
              </button>
            )}
          </Card>

          {/* Steps overview */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <List size={18} className="text-gov-600" aria-hidden="true" />
              <h2 className="text-base font-bold text-slate-900">How it works</h2>
            </div>
            <ol className="space-y-2">
              {service.formSteps.map((step, i) => (
                <li key={step.id} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gov-100 text-gov-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{step.title}</p>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                  {service.formSteps.length + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Review & Submit</p>
                  <p className="text-xs text-slate-500">Check your information before sending.</p>
                </div>
              </li>
            </ol>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Quick info */}
          <Card className="bg-navy-800 text-white border-0">
            <h3 className="font-bold mb-4">Quick Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-teal-300 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-white/60">Estimated time</p>
                  <p className="text-sm font-semibold">~{service.estimatedMinutes} minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-teal-300 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-white/60">Documents needed</p>
                  <p className="text-sm font-semibold">{service.documents.length} documents</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <IndianRupee size={18} className="text-teal-300 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-white/60">Application fee</p>
                  <p className="text-sm font-semibold">{service.fee}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card shadow="md" border className="border-gov-200 bg-gov-50">
            <p className="text-sm text-slate-700 mb-4 leading-relaxed">
              Ready to begin? We&apos;ll guide you through every step and check your eligibility first.
            </p>
            <Link
              href={`/apply/${service.id}/eligibility`}
              className={cn(
                'flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl',
                'bg-navy-800 text-white font-bold text-base shadow-sm',
                'hover:bg-navy-900 transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2',
                'min-h-[52px]'
              )}
            >
              Start Application <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <p className="text-xs text-slate-500 text-center mt-3">
              You can save and continue later.
            </p>
          </Card>

          <Alert variant="info">
            <strong>This is a demo.</strong> No real application will be submitted. Use test data only.
          </Alert>
        </aside>
      </div>
    </PageLayout>
  );
}
