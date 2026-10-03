'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { serviceCategories } from '@/lib/mockData';
import { PageLayout, PageHeader } from '@/components/layout/PageLayout';
import { ServiceCategoryCard } from '@/components/features/ServiceCard';

export default function ServicesPage() {
  const { language } = useApp();
  return (
    <PageLayout maxWidth="xl">
      <PageHeader
        title="Government Services"
        description="Choose a category to find the service you need."
        backHref="/home"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {serviceCategories.map(cat => (
          <ServiceCategoryCard
            key={cat.id}
            category={cat}
            href={`/services/${cat.id}`}
          />
        ))}
      </div>
    </PageLayout>
  );
}
