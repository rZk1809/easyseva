import { tr, t } from '@/lib/translations';

describe('tr', () => {
  it('returns the English string for a known key', () => {
    expect(tr('nav.home', 'en')).toBe('Home');
  });

  it('returns the Tamil string for a known key', () => {
    expect(tr('nav.home', 'ta')).toBe(t['nav.home'].ta);
  });

  it('returns the Hindi string for a known key', () => {
    expect(tr('nav.home', 'hi')).toBe(t['nav.home'].hi);
  });

  it('returns the key itself when the key is unknown', () => {
    expect(tr('does.not.exist', 'en')).toBe('does.not.exist');
  });

  it('interpolates variables into the string', () => {
    // Use a temporary key to verify interpolation without depending on content.
    t['test.greeting'] = {
      en: 'Hello {name}, you have {count} messages',
      ta: 'வணக்கம் {name}',
      hi: 'नमस्ते {name}',
    };
    expect(tr('test.greeting', 'en', { name: 'Lakshmi', count: 3 })).toBe(
      'Hello Lakshmi, you have 3 messages'
    );
    delete t['test.greeting'];
  });

  it('every known key defines all three languages', () => {
    Object.entries(t).forEach(([, value]) => {
      expect(typeof value.en).toBe('string');
      expect(typeof value.ta).toBe('string');
      expect(typeof value.hi).toBe('string');
    });
  });
});
