import { buildTimeline, getStatusLabel, getStatusProgress } from '@/lib/applicationUtils';

const T = '2026-09-12T10:00:00.000Z';

describe('buildTimeline', () => {
  it('returns exactly 4 steps for every status', () => {
    ['submitted', 'documents_verified', 'under_review', 'action_required', 'approved', 'rejected'].forEach(s => {
      expect(buildTimeline(s, T)).toHaveLength(4);
    });
  });

  describe('submitted', () => {
    const tl = buildTimeline('submitted', T);
    it('step 0 is in_progress', () => expect(tl[0].status).toBe('in_progress'));
    it('steps 1–3 are pending', () => {
      expect(tl[1].status).toBe('pending');
      expect(tl[2].status).toBe('pending');
      expect(tl[3].status).toBe('pending');
    });
  });

  describe('documents_verified', () => {
    const tl = buildTimeline('documents_verified', T);
    it('step 0 is completed', () => expect(tl[0].status).toBe('completed'));
    it('step 1 is in_progress', () => expect(tl[1].status).toBe('in_progress'));
    it('steps 2–3 are pending', () => {
      expect(tl[2].status).toBe('pending');
      expect(tl[3].status).toBe('pending');
    });
  });

  describe('under_review', () => {
    const tl = buildTimeline('under_review', T);
    it('steps 0–1 are completed', () => {
      expect(tl[0].status).toBe('completed');
      expect(tl[1].status).toBe('completed');
    });
    it('step 2 is in_progress', () => expect(tl[2].status).toBe('in_progress'));
    it('step 3 is pending', () => expect(tl[3].status).toBe('pending'));
  });

  describe('action_required', () => {
    const tl = buildTimeline('action_required', T);
    it('step 2 status is action_required', () => expect(tl[2].status).toBe('action_required'));
    it('step 2 has actionLabel', () => expect(tl[2].actionLabel).toBe('View required action'));
    it('step 2 has actionHref', () => expect(tl[2].actionHref).toBe('/applications'));
  });

  describe('approved', () => {
    const tl = buildTimeline('approved', T);
    it('all 4 steps are completed', () => {
      tl.forEach(step => expect(step.status).toBe('completed'));
    });
  });

  describe('rejected', () => {
    const tl = buildTimeline('rejected', T);
    it('step 3 is completed', () => expect(tl[3].status).toBe('completed'));
  });

  it('uses submittedAt as date on completed steps', () => {
    const tl = buildTimeline('documents_verified', T);
    expect(tl[0].date).toBe(T);
  });

  it('has correct IDs', () => {
    const tl = buildTimeline('submitted', T);
    expect(tl[0].id).toBe('received');
    expect(tl[1].id).toBe('docs');
    expect(tl[2].id).toBe('officer');
    expect(tl[3].id).toBe('decision');
  });
});

describe('getStatusLabel', () => {
  const cases: [string, string][] = [
    ['draft', 'Draft'],
    ['submitted', 'Submitted'],
    ['documents_verified', 'Documents Verified'],
    ['under_review', 'Under Review'],
    ['action_required', 'Action Required'],
    ['approved', 'Approved'],
    ['rejected', 'Rejected'],
  ];

  test.each(cases)('"%s" → "%s"', (status, expected) => {
    expect(getStatusLabel(status)).toBe(expected);
  });

  it('returns raw string for unknown status', () => {
    expect(getStatusLabel('totally_unknown')).toBe('totally_unknown');
  });
});

describe('getStatusProgress', () => {
  const cases: [string, number][] = [
    ['draft', 0],
    ['submitted', 25],
    ['documents_verified', 50],
    ['under_review', 75],
    ['action_required', 75],
    ['approved', 100],
    ['rejected', 100],
  ];

  test.each(cases)('"%s" → %i%%', (status, expected) => {
    expect(getStatusProgress(status)).toBe(expected);
  });

  it('returns 0 for unknown status', () => {
    expect(getStatusProgress('mystery_status')).toBe(0);
  });
});
