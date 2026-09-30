import { SyzygyVersion } from '../sharedtypes/SyzygyVersion';

describe('SyzygyVersion', () => {
  it('current version matches release', () => {
    expect(SyzygyVersion.toString(SyzygyVersion.current)).toBe('2.0.0');
  });
});
