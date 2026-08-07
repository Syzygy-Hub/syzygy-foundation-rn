export interface Page<T> {
  readonly items: T[];
  readonly totalCount: number;
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly isEmpty: boolean;
  readonly totalPages: number;
}

export function createPage<T>(params: {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}): Page<T> {
  return {
    ...params,
    get hasNextPage(): boolean { return params.pageNumber * params.pageSize < params.totalCount; },
    get hasPreviousPage(): boolean { return params.pageNumber > 1; },
    get isEmpty(): boolean { return params.items.length === 0; },
    get totalPages(): number { return params.pageSize === 0 ? 0 : Math.ceil(params.totalCount / params.pageSize); },
  };
}
