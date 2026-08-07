export interface NetworkResponse {
  readonly statusCode: number;
  readonly data: Uint8Array;
  readonly headers: Record<string, string>;
  readonly isSuccess: boolean;
  readonly isClientError: boolean;
  readonly isServerError: boolean;
}

export function createNetworkResponse(params: {
  statusCode: number;
  data: Uint8Array;
  headers: Record<string, string>;
}): NetworkResponse {
  return {
    ...params,
    get isSuccess(): boolean { return params.statusCode >= 200 && params.statusCode <= 299; },
    get isClientError(): boolean { return params.statusCode >= 400 && params.statusCode <= 499; },
    get isServerError(): boolean { return params.statusCode >= 500 && params.statusCode <= 599; },
  };
}
