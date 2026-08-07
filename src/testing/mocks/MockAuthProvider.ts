import type { AuthProvider, AuthStateListener } from '../../contracts/auth/AuthProvider';
import type { AuthToken } from '../../contracts/auth/AuthToken';
import { type AuthState, AuthState as AS } from '../../contracts/auth/AuthState';
import { Fixtures } from '../fixtures/FixtureProvider';

export class MockAuthProvider implements AuthProvider {
  private _state: AuthState = AS.unauthenticated();
  private listeners: AuthStateListener[] = [];

  refreshCallCount = 0;
  signOutCallCount = 0;
  refreshResult:
    | { success: true; token: AuthToken }
    | { success: false; error: Error } = {
    success: true,
    token: Fixtures.authToken(),
  };

  get state(): AuthState {
    return this._state;
  }

  subscribe(listener: AuthStateListener): () => void {
    this.listeners.push(listener);
    return (): void => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  authenticate(token: AuthToken): void {
    this._state = AS.authenticated(token);
    this.listeners.forEach((l) => l(this._state));
  }

  async refresh(): Promise<AuthToken> {
    this.refreshCallCount++;
    if (this.refreshResult.success) return this.refreshResult.token;
    throw this.refreshResult.error;
  }

  signOut(): void {
    this.signOutCallCount++;
    this._state = AS.unauthenticated();
    this.listeners.forEach((l) => l(this._state));
  }
}
