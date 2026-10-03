import { generateReferenceNumber, formatFileSize, formatDate, formatRelative, getStatusColor, getStatusLabel, translate } from '@/lib/utils';

describe('generateReferenceNumber', () => {
  it('matches ES-YYYY-NNNNN format', () => {
    expect(generateReferenceNumber()).toMatch(/^ES-\d{4}-\d{5}$/);
  });

  it('contains the current year', () => {
    const year = new Date().getFullYear().toString();
    expect(generateReferenceNumber()).toContain(year);
  });

  it('generates unique values across 100 calls', () => {
    const refs = Array.from({ length: 100 }, generateReferenceNumber);
    const unique = new Set(refs).size;
    expect(unique).toBeGreaterThan(80);
  });
});

describe('formatFileSize', () => {
  it('shows KB for files under 1024 KB', () => {
    expect(formatFileSize(100)).toBe('100 KB');
    expect(formatFileSize(1023)).toBe('1023 KB');
  });

  it('shows MB for files 1024 KB and above', () => {
    expect(formatFileSize(1024)).toBe('1.0 MB');
    expect(formatFileSize(2048)).toBe('2.0 MB');
    expect(formatFileSize(1536)).toBe('1.5 MB');
  });
});

describe('formatDate', () => {
  it('returns a non-empty string', () => {
    const result = formatDate('2026-09-12T10:00:00.000Z');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('includes the year', () => {
    expect(formatDate('2026-09-12T10:00:00.000Z')).toContain('2026');
  });
});

describe('formatRelative', () => {
  it('returns "Just now" for very recent timestamps', () => {
    const now = new Date().toISOString();
    expect(formatRelative(now)).toBe('Just now');
  });

  it('returns minutes ago for recent timestamps', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(formatRelative(fiveMinAgo)).toContain('minute');
  });

  it('returns hours ago for timestamps a few hours back', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
    expect(formatRelative(threeHoursAgo)).toContain('hour');
  });

  it('returns "Yesterday" for yesterday', () => {
    const yesterday = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();
    expect(formatRelative(yesterday)).toBe('Yesterday');
  });
});

describe('getStatusColor', () => {
  it('returns a non-empty tailwind class string for known statuses', () => {
    ['draft', 'submitted', 'approved', 'rejected', 'under_review', 'action_required'].forEach(status => {
      const result = getStatusColor(status);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  it('returns a fallback for unknown status', () => {
    expect(getStatusColor('alien_status')).toBeTruthy();
  });

  it('approved and rejected have different colors', () => {
    expect(getStatusColor('approved')).not.toBe(getStatusColor('rejected'));
  });
});

describe('getStatusLabel', () => {
  it('returns "Approved" for approved', () => {
    expect(getStatusLabel('approved')).toBe('Approved');
  });

  it('returns raw value for unknown status', () => {
    expect(getStatusLabel('foobar')).toBe('foobar');
  });
});

describe('translate', () => {
  const obj = { en: 'Hello', ta: 'வணக்கம்', hi: 'नमस्ते' };

  it('returns English for "en"', () => expect(translate(obj, 'en')).toBe('Hello'));
  it('returns Tamil for "ta"', () => expect(translate(obj, 'ta')).toBe('வணக்கம்'));
  it('returns Hindi for "hi"', () => expect(translate(obj, 'hi')).toBe('नमस्ते'));

  it('passes through plain strings unchanged', () => {
    expect(translate('plain string', 'en')).toBe('plain string');
    expect(translate('plain string', 'ta')).toBe('plain string');
  });
});
