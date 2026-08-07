export interface PaginationRequest {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly cursor?: string;
}

export function createPaginationRequest(params?: Partial<PaginationRequest>): PaginationRequest {
  return {
    pageNumber: params?.pageNumber ?? 1,
    pageSize: params?.pageSize ?? 20,
    cursor: params?.cursor,
  };
}
