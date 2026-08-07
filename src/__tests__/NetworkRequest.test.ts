import { createNetworkRequest } from '../contracts/network/NetworkRequest';
import { createNetworkResponse } from '../contracts/network/NetworkResponse';
import { NetworkMethod } from '../contracts/network/NetworkMethod';

const makeResponse = (code: number) =>
  createNetworkResponse({ statusCode: code, data: new Uint8Array(), headers: {} });

describe('NetworkRequest', () => {
  it('default timeoutSeconds is 30', () => {
    const req = createNetworkRequest({ url: 'https://example.com', method: NetworkMethod.GET, headers: {} });
    expect(req.timeoutSeconds).toBe(30);
  });

  it('custom timeoutSeconds is respected', () => {
    const req = createNetworkRequest({
      url: 'https://example.com',
      method: NetworkMethod.POST,
      headers: {},
      timeoutSeconds: 60,
    });
    expect(req.timeoutSeconds).toBe(60);
  });
});

describe('NetworkMethod', () => {
  it('GET value is GET', () => expect(NetworkMethod.GET).toBe('GET'));
  it('POST value is POST', () => expect(NetworkMethod.POST).toBe('POST'));
  it('PUT value is PUT', () => expect(NetworkMethod.PUT).toBe('PUT'));
  it('PATCH value is PATCH', () => expect(NetworkMethod.PATCH).toBe('PATCH'));
  it('DELETE value is DELETE', () => expect(NetworkMethod.DELETE).toBe('DELETE'));
  it('HEAD value is HEAD', () => expect(NetworkMethod.HEAD).toBe('HEAD'));
});

describe('NetworkResponse', () => {
  it('isSuccess true for 200', () => expect(makeResponse(200).isSuccess).toBe(true));
  it('isSuccess true for 299', () => expect(makeResponse(299).isSuccess).toBe(true));
  it('isSuccess false for 300', () => expect(makeResponse(300).isSuccess).toBe(false));
  it('isSuccess false for 400', () => expect(makeResponse(400).isSuccess).toBe(false));
  it('isSuccess false for 500', () => expect(makeResponse(500).isSuccess).toBe(false));

  it('isClientError true for 400', () => expect(makeResponse(400).isClientError).toBe(true));
  it('isClientError true for 499', () => expect(makeResponse(499).isClientError).toBe(true));
  it('isClientError false for 500', () => expect(makeResponse(500).isClientError).toBe(false));
  it('isClientError false for 200', () => expect(makeResponse(200).isClientError).toBe(false));

  it('isServerError true for 500', () => expect(makeResponse(500).isServerError).toBe(true));
  it('isServerError true for 599', () => expect(makeResponse(599).isServerError).toBe(true));
  it('isServerError false for 400', () => expect(makeResponse(400).isServerError).toBe(false));
});
