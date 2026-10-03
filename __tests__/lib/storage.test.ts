import { saveToStorage, loadFromStorage, removeFromStorage } from '@/lib/utils';

describe('storage helpers', () => {
  afterEach(() => {
    // @ts-expect-error — allow resetting the mock between tests
    delete global.localStorage;
  });

  function mockLocalStorage() {
    const store: Record<string, string> = {};
    const mock = {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => { store[k] = v; },
      removeItem: (k: string) => { delete store[k]; },
    };
    // @ts-expect-error — inject a minimal localStorage for the test
    global.localStorage = mock;
    return store;
  }

  it('round-trips a value through save and load', () => {
    const store = mockLocalStorage();
    saveToStorage('language', 'ta');
    expect(store['easyseva_language']).toBe(JSON.stringify('ta'));
    expect(loadFromStorage('language', 'en')).toBe('ta');
  });

  it('returns the fallback when the key is absent', () => {
    mockLocalStorage();
    expect(loadFromStorage('missing', 'default')).toBe('default');
  });

  it('returns the fallback when localStorage is unavailable (SSR)', () => {
    expect(loadFromStorage('language', 'en')).toBe('en');
  });

  it('does not throw when saving without localStorage (SSR)', () => {
    expect(() => saveToStorage('language', 'ta')).not.toThrow();
  });

  it('removes a stored value', () => {
    const store = mockLocalStorage();
    saveToStorage('language', 'hi');
    removeFromStorage('language');
    expect(store['easyseva_language']).toBeUndefined();
  });

  it('returns the fallback for corrupted JSON', () => {
    const store = mockLocalStorage();
    store['easyseva_broken'] = '{not valid json';
    expect(loadFromStorage('broken', 42)).toBe(42);
  });
});
