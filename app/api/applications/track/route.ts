import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { buildTimeline, getStatusLabel, getStatusProgress } from '@/lib/applicationUtils';
import type { Application } from '@/lib/types';

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get('ref');
  if (!ref) return NextResponse.json({ error: 'Reference number required.' }, { status: 400 });

  try {
    const app = await prisma.application.findUnique({
      where: { referenceNumber: ref.trim().toUpperCase() },
    });

    if (!app) {
      // Try case-insensitive fallback
      const apps = await prisma.application.findMany({
        where: { referenceNumber: { equals: ref.trim(), mode: 'insensitive' } },
        take: 1,
      });
      if (apps.length === 0) return NextResponse.json({ application: null });
      const found = apps[0];
      const status = found.status as Application['status'];
      return NextResponse.json({
        application: {
          id: found.id,
          referenceNumber: found.referenceNumber,
          serviceId: found.serviceId,
          serviceName: found.serviceName,
          serviceCategory: found.serviceCategory,
          status,
          statusLabel: getStatusLabel(status),
          progress: getStatusProgress(status),
          submittedAt: found.submittedAt.toISOString(),
          lastUpdated: found.updatedAt.toISOString(),
          timeline: buildTimeline(status, found.submittedAt.toISOString()),
        } satisfies Application,
      });
    }

    const status = app.status as Application['status'];
    return NextResponse.json({
      application: {
        id: app.id,
        referenceNumber: app.referenceNumber,
        serviceId: app.serviceId,
        serviceName: app.serviceName,
        serviceCategory: app.serviceCategory,
        status,
        statusLabel: getStatusLabel(status),
        progress: getStatusProgress(status),
        submittedAt: app.submittedAt.toISOString(),
        lastUpdated: app.updatedAt.toISOString(),
        timeline: buildTimeline(status, app.submittedAt.toISOString()),
      } satisfies Application,
    });
  } catch (err) {
    console.error('[applications/track]', err);
    return NextResponse.json({ error: 'Failed to track application.' }, { status: 500 });
  }
}
