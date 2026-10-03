'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { faqItems } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Flag, BookOpen } from 'lucide-react';

export default function HelpPage() {
  const { language } = useApp();
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <PageLayout maxWidth="lg">
      <PageHeader
        title="Help & Support"
        description="Find answers and get assistance with your applications."
        backHref="/home"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <Card key={i} padding="none">
                <button
                  className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gov-600"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  aria-expanded={openFAQ === i}
                >
                  <span className="font-semibold text-slate-800 text-sm leading-snug pr-4">{item.question}</span>
                  <span className="shrink-0 mt-0.5">
                    {openFAQ === i
                      ? <ChevronUp size={18} className="text-gov-600" />
                      : <ChevronDown size={18} className="text-slate-400" />
                    }
                  </span>
                </button>
                {openFAQ === i && (
                  <div className="px-5 pb-4 animate-fade-in">
                    <p className="text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Support options */}
        <aside className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Get More Help</h2>

          <Card className="hover:border-gov-300 hover:shadow-md transition-all cursor-pointer" padding="sm">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gov-50 rounded-lg flex items-center justify-center shrink-0">
                <MessageCircle size={20} className="text-gov-600" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Live Chat Support</p>
                <p className="text-xs text-slate-500 mt-0.5">Chat with a support agent (Mon–Fri, 9am–6pm)</p>
                <p className="text-xs text-gov-600 font-semibold mt-1">Coming soon</p>
              </div>
            </div>
          </Card>

          <Card className="hover:border-gov-300 hover:shadow-md transition-all cursor-pointer" padding="sm">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
                <Phone size={20} className="text-teal-600" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Helpline</p>
                <p className="text-xs text-slate-500 mt-0.5">Call us for help with your application</p>
                <p className="text-sm font-bold text-teal-700 mt-1">1800-XXX-XXXX</p>
                <p className="text-xs text-slate-400">Toll-free · Mon–Sat, 8am–8pm</p>
              </div>
            </div>
          </Card>

          <Card className="hover:border-gov-300 hover:shadow-md transition-all cursor-pointer" padding="sm">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-purple-600" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">User Guide</p>
                <p className="text-xs text-slate-500 mt-0.5">Step-by-step guide to using EasySeva</p>
                <p className="text-xs text-gov-600 font-semibold mt-1">Download PDF</p>
              </div>
            </div>
          </Card>

          <Card className="hover:border-red-300 hover:shadow-md transition-all cursor-pointer" padding="sm">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                <Flag size={20} className="text-red-500" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Report a Problem</p>
                <p className="text-xs text-slate-500 mt-0.5">Tell us about a bug or technical issue.</p>
                <p className="text-xs text-red-600 font-semibold mt-1">Send report</p>
              </div>
            </div>
          </Card>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm font-semibold text-amber-900 mb-1">Demo Prototype</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              This is an HCI academic prototype. Support channels above are for demonstration only.
            </p>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
