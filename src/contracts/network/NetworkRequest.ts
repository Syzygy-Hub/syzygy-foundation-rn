import type { NetworkMethod } from './NetworkMethod';

export interface NetworkRequest {
  readonly url: string;
  readonly method: NetworkMethod;
  readonly headers: Record<string, string>;
  readonly body?: Uint8Array;
  readonly timeoutSeconds: number;
}

export function createNetworkRequest(
  params: Omit<NetworkRequest, 'timeoutSeconds'> & { timeoutSeconds?: number }
): NetworkRequest {
  return { timeoutSeconds: 30, ...params };
}
