import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { paymentIntentId, applicationId } = await req.json();

    // In production, verify with Stripe API. For demo, mark as succeeded.
    if (applicationId) {
      await prisma.payment.updateMany({
        where: { applicationId, stripeIntentId: paymentIntentId },
        data: { status: 'succeeded' },
      });
    }

    return NextResponse.json({ success: true, status: 'succeeded' });
  } catch (err) {
    console.error('[confirm-payment]', err);
    return NextResponse.json({ error: 'Confirmation failed.' }, { status: 500 });
  }
}
