import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/db';
import { generateOtp } from '@/lib/auth';

const EMAIL_SUBJECT = 'Your EasySeva verification code';

function otpEmailText(code: string): string {
  return `Your one-time verification code is: ${code}\n\nThis code expires in 10 minutes. Do not share it with anyone.`;
}

function otpEmailHtml(code: string): string {
  return `
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
  `;
}

// Resend's API requires either a verified sending domain or the shared
// onboarding sender. Default to the shared sender so OTP email works out of the box.
const EMAIL_FROM = process.env.EMAIL_FROM?.includes('<')
  ? process.env.EMAIL_FROM
  : `EasySeva <${process.env.EMAIL_FROM ?? 'onboarding@resend.dev'}>`;

async function sendViaResend(to: string, code: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to,
        subject: EMAIL_SUBJECT,
        text: otpEmailText(code),
        html: otpEmailHtml(code),
      }),
    });
    if (res.ok) return true;
    console.warn('[send-otp] Resend rejected:', await res.text());
    return false;
  } catch (err) {
    console.warn('[send-otp] Resend request failed:', err);
    return false;
  }
}

async function sendViaSmtp(to: string, code: string): Promise<boolean> {
  const smtpReady = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  if (!smtpReady) return false;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject: EMAIL_SUBJECT,
      text: otpEmailText(code),
      html: otpEmailHtml(code),
    });
    return true;
  } catch (err) {
    console.warn('[send-otp] SMTP send failed:', err);
    return false;
  }
}

/** Try Resend, then SMTP. Returns true only if the email was actually sent. */
async function deliverOtp(to: string, code: string): Promise<boolean> {
  return (await sendViaResend(to, code)) || (await sendViaSmtp(to, code));
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

    const emailed = await deliverOtp(normalizedEmail, code);

    if (emailed) {
      return NextResponse.json({ success: true, message: 'OTP sent to your email address.' });
    }

    // Demo mode: no email provider available (or delivery failed) — return the
    // OTP so the flow still works and it's shown on the verification screen.
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
