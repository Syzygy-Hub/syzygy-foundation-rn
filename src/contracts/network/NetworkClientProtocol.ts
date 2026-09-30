import type { NetworkRequest } from './NetworkRequest';
import type { NetworkResponse } from './NetworkResponse';

export interface NetworkClientProtocol {
  execute(request: NetworkRequest): Promise<NetworkResponse>;
  /** Cancels in-flight requests and releases resources held by this client. */
  dispose(): void;
}
