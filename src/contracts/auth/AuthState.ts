import type { AuthToken } from './AuthToken';

export type AuthState =
  | { readonly kind: 'unauthenticated' }
  | { readonly kind: 'authenticated'; readonly token: AuthToken }
  | { readonly kind: 'expired'; readonly token: AuthToken }
  | { readonly kind: 'refreshing' };

export const AuthState = {
  unauthenticated(): AuthState { return { kind: 'unauthenticated' }; },
  authenticated(token: AuthToken): AuthState { return { kind: 'authenticated', token }; },
  expired(token: AuthToken): AuthState { return { kind: 'expired', token }; },
  refreshing(): AuthState { return { kind: 'refreshing' }; },
  isAuthenticated(state: AuthState): boolean { return state.kind === 'authenticated'; },
  token(state: AuthState): AuthToken | undefined {
    return state.kind === 'authenticated' || state.kind === 'expired' ? state.token : undefined;
  },
};
