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
  /** Returns true if biometric authentication is available and enrolled on this device. */
  canUseBiometric(): boolean;
  /** Triggers the system biometric prompt with the given reason. Resolves to true on success, false on failure or cancellation. */
  authenticateWithBiometric(reason: string): Promise<boolean>;
  /** Attempts to refresh the current auth token. Resolves to true on success, false on failure. */
  refreshToken(): Promise<boolean>;
}
