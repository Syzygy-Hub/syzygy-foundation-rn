import { SyzygyErrorCode } from '../errors/SyzygyErrorCode';

describe('SyzygyErrorCode', () => {
  it('static codes are defined', () => {
    expect(SyzygyErrorCode.unknown).toBeDefined();
    expect(SyzygyErrorCode.cancelled).toBeDefined();
    expect(SyzygyErrorCode.timeout).toBeDefined();
    expect(SyzygyErrorCode.unauthenticated).toBeDefined();
    expect(SyzygyErrorCode.forbidden).toBeDefined();
    expect(SyzygyErrorCode.notFound).toBeDefined();
    expect(SyzygyErrorCode.serverError).toBeDefined();
    expect(SyzygyErrorCode.networkUnavailable).toBeDefined();
    expect(SyzygyErrorCode.decodingFailed).toBeDefined();
    expect(SyzygyErrorCode.encodingFailed).toBeDefined();
  });

  it('equals returns true for same rawValue', () => {
    const a = new SyzygyErrorCode('timeout');
    const b = new SyzygyErrorCode('timeout');
    expect(a.equals(b)).toBe(true);
  });

  it('equals returns false for different rawValues', () => {
    const a = new SyzygyErrorCode('timeout');
    const b = new SyzygyErrorCode('not_found');
    expect(a.equals(b)).toBe(false);
  });

  it('toString returns rawValue', () => {
    expect(new SyzygyErrorCode('custom_error').toString()).toBe('custom_error');
  });
});
