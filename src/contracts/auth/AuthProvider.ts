import type { AuthToken } from './AuthToken';
import type { AuthState } from './AuthState';

export type AuthStateListener = (state: AuthState) => void;

/**
 * Callback-based auth contract for React Native.
 * subscribe() returns an unsubscribe function — call it to stop receiving updates.
 */
export interface AuthProvider {
  readonly state: AuthState;
  subscribe(listener: AuthStateListener): () => void;
  authenticate(token: AuthToken): void;
  refresh(): Promise<AuthToken>;
  signOut(): void;
}
