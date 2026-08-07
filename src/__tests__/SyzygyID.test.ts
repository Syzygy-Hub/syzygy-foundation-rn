import { SyzygyID } from '../primitives/id/SyzygyID';

describe('SyzygyID', () => {
  it('generate produces unique IDs', () => {
    const a = SyzygyID.generate<string>();
    const b = SyzygyID.generate<string>();
    expect(a.rawValue).not.toBe(b.rawValue);
  });

  it('rawValue round-trips through constructor', () => {
    const id = new SyzygyID<string>('abc-123');
    expect(id.rawValue).toBe('abc-123');
  });

  it('toString returns rawValue', () => {
    expect(new SyzygyID<string>('abc-123').toString()).toBe('abc-123');
  });

  it('equals returns true for same rawValue', () => {
    const a = new SyzygyID<string>('same');
    const b = new SyzygyID<string>('same');
    expect(a.equals(b)).toBe(true);
  });

  it('equals returns false for different rawValues', () => {
    const a = new SyzygyID<string>('one');
    const b = new SyzygyID<string>('two');
    expect(a.equals(b)).toBe(false);
  });

  it('compareTo returns negative when a < b lexicographically', () => {
    const a = new SyzygyID<string>('aaa');
    const b = new SyzygyID<string>('zzz');
    expect(a.compareTo(b)).toBeLessThan(0);
  });

  it('compareTo returns positive when a > b', () => {
    const a = new SyzygyID<string>('zzz');
    const b = new SyzygyID<string>('aaa');
    expect(a.compareTo(b)).toBeGreaterThan(0);
  });

  it('compareTo returns 0 for equal rawValues', () => {
    const a = new SyzygyID<string>('same');
    const b = new SyzygyID<string>('same');
    expect(a.compareTo(b)).toBe(0);
  });
});
