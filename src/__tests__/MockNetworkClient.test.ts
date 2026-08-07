import { MockNetworkClient } from '../testing/mocks/MockNetworkClient';
import { createNetworkResponse } from '../contracts/network/NetworkResponse';
import { createNetworkRequest } from '../contracts/network/NetworkRequest';
import { NetworkMethod } from '../contracts/network/NetworkMethod';

const makeRequest = () =>
  createNetworkRequest({ url: 'https://example.com', method: NetworkMethod.GET, headers: {} });

const makeResponse = (code = 200) =>
  createNetworkResponse({ statusCode: code, data: new Uint8Array(), headers: {} });

describe('MockNetworkClient', () => {
  let client: MockNetworkClient;
  beforeEach(() => {
    client = new MockNetworkClient();
  });

  it('execute returns queued response', async () => {
    client.responses.push(makeResponse(200));
    const result = await client.execute(makeRequest());
    expect(result.statusCode).toBe(200);
  });

  it('execute consumes responses in FIFO order', async () => {
    client.responses.push(makeResponse(200));
    client.responses.push(makeResponse(404));
    const first = await client.execute(makeRequest());
    const second = await client.execute(makeRequest());
    expect(first.statusCode).toBe(200);
    expect(second.statusCode).toBe(404);
  });

  it('execute records each request', async () => {
    client.responses.push(makeResponse());
    await client.execute(makeRequest());
    expect(client.requests).toHaveLength(1);
    expect(client.requests[0].url).toBe('https://example.com');
  });

  it('execute throws configured error', async () => {
    client.error = new Error('network error');
    await expect(client.execute(makeRequest())).rejects.toThrow('network error');
  });

  it('execute throws when response queue is empty', async () => {
    await expect(client.execute(makeRequest())).rejects.toThrow();
  });
});
