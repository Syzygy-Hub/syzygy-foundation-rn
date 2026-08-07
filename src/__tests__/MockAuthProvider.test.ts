import { MockAuthProvider } from '../testing/mocks/MockAuthProvider';
import { AuthState } from '../contracts/auth/AuthState';

describe('MockAuthProvider', () => {
  let provider: MockAuthProvider;
  beforeEach(() => {
    provider = new MockAuthProvider();
  });

  it('initial state is unauthenticated', () => {
    expect(AuthState.isAuthenticated(provider.state)).toBe(false);
  });

  it('authenticate transitions to authenticated', () => {
    provider.authenticate({ accessToken: 'tok' });
    expect(AuthState.isAuthenticated(provider.state)).toBe(true);
  });

  it('token is accessible after authenticate', () => {
    const token = { accessToken: 'tok' };
    provider.authenticate(token);
    expect(AuthState.token(provider.state)).toBe(token);
  });

  it('signOut transitions to unauthenticated and increments signOutCallCount', () => {
    provider.authenticate({ accessToken: 'tok' });
    provider.signOut();
    expect(AuthState.isAuthenticated(provider.state)).toBe(false);
    expect(provider.signOutCallCount).toBe(1);
  });

  it('signOut increments count on each call', () => {
    provider.signOut();
    provider.signOut();
    expect(provider.signOutCallCount).toBe(2);
  });

  it('refresh increments refreshCallCount', async () => {
    await provider.refresh();
    await provider.refresh();
    expect(provider.refreshCallCount).toBe(2);
  });

  it('subscribe notifies listener on state changes', () => {
    const states: unknown[] = [];
    provider.subscribe((s) => states.push(s));
    provider.authenticate({ accessToken: 'tok' });
    provider.signOut();
    expect(states).toHaveLength(2);
  });
});
