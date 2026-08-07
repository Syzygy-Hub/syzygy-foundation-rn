export type ConnectivityState = 'connected' | 'disconnected' | 'unknown';

export function isConnected(state: ConnectivityState): boolean {
  return state === 'connected';
}
