import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionCookie, verifySessionToken } from '@/lib/auth';

// Dummy Stripe-like payment intent creator
// In production, replace with: const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
async function createDummyPaymentIntent(amount: number, currency: string) {
  await new Promise(res => setTimeout(res, 400)); // simulate network delay
  return {
    id: `pi_demo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    client_secret: `pi_demo_secret_${Math.random().toString(36).slice(2, 16)}`,
    amount,
    currency,
    status: 'requires_payment_method',
  };
}

export async function POST(req: NextRequest) {
  try {
    const token = await getSessionCookie();
    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const payload = await verifySessionToken(token);
    if (!payload?.sessionId) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

    const session = await prisma.session.findUnique({
      where: { id: payload.sessionId },
    });
    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const { amount, currency = 'inr', applicationId, serviceId } = await req.json();

    if (!amount || amount < 100) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const intent = await createDummyPaymentIntent(amount, currency);

    // If applicationId provided, record the payment in DB
    if (applicationId) {
      await prisma.payment.upsert({
        where: { applicationId },
        update: {
          amount,
          currency,
          status: 'pending',
          stripeIntentId: intent.id,
        },
        create: {
          applicationId,
          amount,
          currency,
          status: 'pending',
          stripeIntentId: intent.id,
        },
      });
    }

    return NextResponse.json({
      paymentIntentId: intent.id,
      clientSecret: intent.client_secret,
      amount,
      currency,
    });
  } catch (err) {
    console.error('[create-intent]', err);
    return NextResponse.json({ error: 'Payment initialization failed.' }, { status: 500 });
  }
}
