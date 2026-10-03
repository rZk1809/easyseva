import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/db';
import { generateOtp } from '@/lib/auth';

async function sendEmailOtp(to: string, code: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"EasySeva" <${process.env.EMAIL_FROM ?? 'noreply@easyseva.gov.in'}>`,
    to,
    subject: 'Your EasySeva verification code',
    text: `Your one-time verification code is: ${code}\n\nThis code expires in 10 minutes. Do not share it with anyone.`,
    html: `
      <div style="font-family:sans-serif;max-width:420px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:12px;">
        <div style="background:#1e3a5f;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
          <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">EasySeva</h1>
          <p style="color:#93c5fd;margin:4px 0 0;font-size:13px;">Government Services Portal</p>
        </div>
        <p style="color:#374151;font-size:15px;">Your verification code is:</p>
        <div style="text-align:center;padding:20px;background:#fff;border:2px solid #1e3a5f;border-radius:10px;margin:16px 0;">
          <span style="font-size:40px;font-weight:900;letter-spacing:10px;color:#1e3a5f;font-family:monospace;">${code}</span>
        </div>
        <p style="color:#6b7280;font-size:13px;line-height:1.5;">
          This code expires in <strong>10 minutes</strong>. If you did not request this, you can safely ignore this email.
        </p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">
        <p style="color:#9ca3af;font-size:11px;">EasySeva — Tamil Nadu Government Services Portal</p>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit: max 3 OTPs in 10 minutes
    const recentCount = await prisma.otpCode.count({
      where: {
        email: normalizedEmail,
        createdAt: { gte: new Date(Date.now() - 10 * 60 * 1000) },
      },
    });

    if (recentCount >= 3) {
      return NextResponse.json(
        { error: 'Too many OTP requests. Please wait 10 minutes before trying again.' },
        { status: 429 }
      );
    }

    // Invalidate previous unused OTPs
    await prisma.otpCode.updateMany({
      where: { email: normalizedEmail, used: false },
      data: { used: true },
    });

    // Upsert user record
    const user = await prisma.user.upsert({
      where: { email: normalizedEmail },
      update: {},
      create: { email: normalizedEmail },
    });

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpCode.create({
      data: { email: normalizedEmail, code, expiresAt, userId: user.id },
    });

    const smtpReady = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

    if (smtpReady) {
      try {
        await sendEmailOtp(normalizedEmail, code);
        return NextResponse.json({ success: true, message: 'OTP sent to your email address.' });
      } catch (emailErr) {
        console.error('[send-otp] email send failed, falling back to demo mode:', emailErr);
        // Fall through to demo mode
      }
    }

    // Demo mode: return OTP in response (no real email sent)
    return NextResponse.json({
      success: true,
      message: 'OTP generated. Check the demo banner on the next page.',
      demoOtp: code,
    });
  } catch (err) {
    console.error('[send-otp]', err);
    return NextResponse.json({ error: 'Failed to send OTP. Please try again.' }, { status: 500 });
  }
}
