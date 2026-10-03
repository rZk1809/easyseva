'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { serviceCategories, services } from '@/lib/mockData';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { ServiceListItem } from '@/components/features/ServiceCard';
import { Alert } from '@/components/ui/Alert';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const category = serviceCategories.find(c => c.id === categoryId);
  const categoryServices = services.filter(s => s.categoryId === categoryId);

  if (!category) {
    return (
      <PageLayout>
        <Alert variant="error">Category not found.</Alert>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="xl">
      <PageHeader
        title={category.title}
        description={category.description}
        backHref="/services"
      />

      {categoryServices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 text-lg font-medium">More services coming soon.</p>
          <p className="text-slate-400 text-sm mt-1">Check back later or explore other categories.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {categoryServices.map(service => (
            <ServiceListItem
              key={service.id}
              service={service}
              href={`/services/${categoryId}/${service.id}`}
            />
          ))}
        </div>
      )}
    </PageLayout>
  );
}
