import { SyzygyEnvironment } from '../sharedtypes/SyzygyEnvironment';

describe('SyzygyEnvironment', () => {
  it('isDebug is true only for debug', () => {
    expect(SyzygyEnvironment.isDebug(SyzygyEnvironment.debug)).toBe(true);
    expect(SyzygyEnvironment.isDebug(SyzygyEnvironment.staging)).toBe(false);
    expect(SyzygyEnvironment.isDebug(SyzygyEnvironment.production)).toBe(false);
  });

  it('isProduction is true only for production', () => {
    expect(SyzygyEnvironment.isProduction(SyzygyEnvironment.production)).toBe(true);
    expect(SyzygyEnvironment.isProduction(SyzygyEnvironment.debug)).toBe(false);
    expect(SyzygyEnvironment.isProduction(SyzygyEnvironment.staging)).toBe(false);
  });

  it('values are string literals', () => {
    expect(SyzygyEnvironment.debug).toBe('debug');
    expect(SyzygyEnvironment.staging).toBe('staging');
    expect(SyzygyEnvironment.production).toBe('production');
  });
});
