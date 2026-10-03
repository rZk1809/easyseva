import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/apiAuth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Only PDF, JPG, and PNG files are allowed.' }, { status: 400 });
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'File must be smaller than 5 MB.' }, { status: 400 });
    }

    // Sanitize filename: keep extension, replace rest with timestamp+random
    const ext = path.extname(file.name).toLowerCase() || '.bin';
    const safeName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
    const sizeKB = Math.round(file.size / 1024);

    // Try to persist the file to disk. On serverless/read-only filesystems
    // (e.g. Vercel, where only /tmp is writable) this will fail — in that case
    // we still accept the upload and return its metadata so the flow works.
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', user.id);
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, safeName), buffer);

      return NextResponse.json({
        url: `/uploads/${user.id}/${safeName}`,
        filename: file.name,
        sizeKB,
      });
    } catch (fsErr) {
      console.warn('[upload] filesystem not writable, accepting metadata only:', fsErr);
      return NextResponse.json({ filename: file.name, sizeKB });
    }
  } catch (err) {
    console.error('[upload]', err);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
