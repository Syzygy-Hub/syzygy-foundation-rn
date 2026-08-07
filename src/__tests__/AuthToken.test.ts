import { isExpired } from '../contracts/auth/AuthToken';
import { AuthState } from '../contracts/auth/AuthState';
import { createSyzygyTimestamp } from '../primitives/time/SyzygyTimestamp';

describe('AuthToken.isExpired', () => {
  it('is false when expiresAt is undefined', () => {
    expect(isExpired({ accessToken: 'tok' })).toBe(false);
  });

  it('is true when expiresAt is in the past', () => {
    const past = createSyzygyTimestamp(1);
    expect(isExpired({ accessToken: 'tok', expiresAt: past })).toBe(true);
  });

  it('is false when expiresAt is in the future', () => {
    const future = createSyzygyTimestamp(Date.now() + 3_600_000);
    expect(isExpired({ accessToken: 'tok', expiresAt: future })).toBe(false);
  });
});

describe('AuthState', () => {
  const token = { accessToken: 'tok' };

  it('isAuthenticated is true only for authenticated', () => {
    expect(AuthState.isAuthenticated(AuthState.authenticated(token))).toBe(true);
    expect(AuthState.isAuthenticated(AuthState.unauthenticated())).toBe(false);
    expect(AuthState.isAuthenticated(AuthState.expired(token))).toBe(false);
    expect(AuthState.isAuthenticated(AuthState.refreshing())).toBe(false);
  });

  it('token returns the AuthToken for authenticated state', () => {
    expect(AuthState.token(AuthState.authenticated(token))).toBe(token);
  });

  it('token returns the AuthToken for expired state', () => {
    expect(AuthState.token(AuthState.expired(token))).toBe(token);
  });

  it('token returns undefined for unauthenticated', () => {
    expect(AuthState.token(AuthState.unauthenticated())).toBeUndefined();
  });

  it('token returns undefined for refreshing', () => {
    expect(AuthState.token(AuthState.refreshing())).toBeUndefined();
  });
});
