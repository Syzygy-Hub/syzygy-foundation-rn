import type { ConnectivityState } from './ConnectivityState';

export type ConnectivityStateListener = (state: ConnectivityState) => void;

/**
 * Controlled state contract — Foundation exposes the shape only.
 * Self-detecting implementations (via @react-native-community/netinfo) live in syzygy-services-rn.
 * subscribe() returns an unsubscribe function.
 */
export interface ConnectivityProvider {
  readonly state: ConnectivityState;
  readonly isConnected: boolean;
  subscribe(listener: ConnectivityStateListener): () => void;
}
