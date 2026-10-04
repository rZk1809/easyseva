'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { services, serviceCategories } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { trx } from '@/lib/translations';
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
  CalendarDays,
  Building2,
  Phone,
  Award,
  HelpCircle,
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
  const category = serviceCategories.find(c => c.id === service.categoryId);
  const categoryTitle = category
    ? (language === 'ta' ? category.titleTa : language === 'hi' ? category.titleHi : category.title)
    : 'Services';

  return (
    <PageLayout maxWidth="lg">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Services', href: '/services' },
          { label: categoryTitle, href: `/services/${service.categoryId}` },
          { label: title },
        ]}
      />
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
            <h2 className="text-base font-bold text-slate-900 mb-2">{trx('What is this service?', language)}</h2>
            <p className="text-slate-600 leading-relaxed">{trx(service.fullDescription, language)}</p>

            {service.whatYouGet && (
              <div className="mt-4 flex items-start gap-3 bg-teal-50 border border-teal-200 rounded-xl p-3">
                <Award size={18} className="text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-teal-800 uppercase tracking-wide">{trx("What you'll get", language)}</p>
                  <p className="text-sm text-teal-900 mt-0.5 leading-relaxed">{trx(service.whatYouGet, language)}</p>
                </div>
              </div>
            )}

            {service.usedFor.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">{trx('You may need this for:', language)}</p>
                <ul className="space-y-1.5">
                  {service.usedFor.map((use, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={15} className="text-teal-600 mt-0.5 shrink-0" aria-hidden="true" />
                      {trx(use, language)}
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
              <h2 className="text-base font-bold text-slate-900">{trx('Documents you will need', language)}</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              {trx('Collect these before you start. It will make the process much faster.', language)}
            </p>
            <div className="space-y-3">
              {docsToShow.map((doc, i) => (
                <div key={doc.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-7 h-7 rounded-full bg-gov-100 flex items-center justify-center shrink-0 text-xs font-bold text-gov-700" aria-hidden="true">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {language === 'ta' ? doc.nameTa : language === 'hi' ? doc.nameHi : doc.name}
                      {doc.required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{trx(doc.description, language)}</p>
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
                  <><ChevronUp size={15} /> {trx('Show fewer', language)}</>
                ) : (
                  <><ChevronDown size={15} /> {trx('See all {n} documents', language).replace('{n}', String(service.documents.length))}</>
                )}
              </button>
            )}
          </Card>

          {/* Steps overview */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <List size={18} className="text-gov-600" aria-hidden="true" />
              <h2 className="text-base font-bold text-slate-900">{trx('How it works', language)}</h2>
            </div>
            <ol className="space-y-2">
              {service.formSteps.map((step, i) => (
                <li key={step.id} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gov-100 text-gov-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{trx(step.title, language)}</p>
                    <p className="text-xs text-slate-500">{trx(step.description, language)}</p>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                  {service.formSteps.length + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{trx('Review & Submit', language)}</p>
                  <p className="text-xs text-slate-500">{trx('Check your information before sending.', language)}</p>
                </div>
              </li>
            </ol>
          </Card>

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle size={18} className="text-gov-600" aria-hidden="true" />
                <h2 className="text-base font-bold text-slate-900">{trx('Frequently asked questions', language)}</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {service.faqs.map((faq, i) => (
                  <details key={i} className="group py-2">
                    <summary className="flex items-center justify-between gap-3 cursor-pointer list-none py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600 rounded">
                      {trx(faq.question, language)}
                      <ChevronDown size={16} className="text-slate-400 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="text-sm text-slate-600 leading-relaxed pt-1 pb-2">{trx(faq.answer, language)}</p>
                  </details>
                ))}
              </div>
            </Card>
          )}

          {/* Related services */}
          {service.relatedServiceIds && service.relatedServiceIds.length > 0 && (
            <Card>
              <h2 className="text-base font-bold text-slate-900 mb-3">{trx('Related services', language)}</h2>
              <div className="space-y-2">
                {service.relatedServiceIds
                  .map(id => services.find(s => s.id === id))
                  .filter((s): s is NonNullable<typeof s> => Boolean(s))
                  .map(rel => (
                    <Link
                      key={rel.id}
                      href={`/services/${rel.categoryId}/${rel.id}`}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg border border-slate-200 hover:border-gov-300 hover:bg-gov-50/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-600"
                    >
                      <span className="text-sm font-semibold text-slate-800">
                        {language === 'ta' ? rel.titleTa : language === 'hi' ? rel.titleHi : rel.title}
                      </span>
                      <ArrowRight size={16} className="text-gov-600 shrink-0" aria-hidden="true" />
                    </Link>
                  ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Quick info */}
          <Card className="bg-navy-800 text-white border-0">
            <h3 className="font-bold mb-4">{trx('Quick Information', language)}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-teal-300 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-white/60">{trx('Estimated time', language)}</p>
                  <p className="text-sm font-semibold">~{service.estimatedMinutes} {trx('minutes', language)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-teal-300 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-white/60">{trx('Documents needed', language)}</p>
                  <p className="text-sm font-semibold">{service.documents.length} {trx('documents', language)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <IndianRupee size={18} className="text-teal-300 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-white/60">{trx('Application fee', language)}</p>
                  <p className="text-sm font-semibold">{trx(service.fee, language)}</p>
                </div>
              </div>
              {service.processingTime && (
                <div className="flex items-center gap-3">
                  <CalendarDays size={18} className="text-teal-300 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-white/60">{trx('Processing time', language)}</p>
                    <p className="text-sm font-semibold">{trx(service.processingTime, language)}</p>
                  </div>
                </div>
              )}
              {service.department && (
                <div className="flex items-start gap-3">
                  <Building2 size={18} className="text-teal-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-white/60">{trx('Issued by', language)}</p>
                    <p className="text-sm font-semibold leading-snug">{trx(service.department, language)}</p>
                  </div>
                </div>
              )}
              {service.helpline && (
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-teal-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-white/60">{trx('Helpline', language)}</p>
                    <p className="text-sm font-semibold leading-snug">{trx(service.helpline, language)}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* CTA */}
          <Card shadow="md" border className="border-gov-200 bg-gov-50">
            <p className="text-sm text-slate-700 mb-4 leading-relaxed">
              {trx("Ready to begin? We'll guide you through every step and check your eligibility first.", language)}
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
              {trx('Start Application', language)} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <p className="text-xs text-slate-500 text-center mt-3">
              {trx('You can save and continue later.', language)}
            </p>
          </Card>

          <Alert variant="info">
            <strong>{trx('This is a demo.', language)}</strong> {trx('No real application will be submitted. Use test data only.', language)}
          </Alert>
        </aside>
      </div>
    </PageLayout>
  );
}
