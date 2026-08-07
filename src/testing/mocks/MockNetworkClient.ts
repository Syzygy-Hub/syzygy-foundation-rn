import type { NetworkClientProtocol } from '../../contracts/network/NetworkClientProtocol';
import type { NetworkRequest } from '../../contracts/network/NetworkRequest';
import type { NetworkResponse } from '../../contracts/network/NetworkResponse';

export class MockNetworkClient implements NetworkClientProtocol {
  responses: NetworkResponse[] = [];
  requests: NetworkRequest[] = [];
  error?: Error;

  async execute(request: NetworkRequest): Promise<NetworkResponse> {
    this.requests.push(request);
    if (this.error) throw this.error;
    const response = this.responses.shift();
    if (!response) throw new Error('MockNetworkClient: no response queued');
    return response;
  }
}
