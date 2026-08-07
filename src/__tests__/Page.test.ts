import { createPage } from '../primitives/pagination/Page';
import { createPaginationRequest } from '../primitives/pagination/PaginationRequest';

describe('Page', () => {
  it('isEmpty is true when items is empty', () => {
    const page = createPage({ items: [], totalCount: 0, pageNumber: 1, pageSize: 20 });
    expect(page.isEmpty).toBe(true);
  });

  it('isEmpty is false when items has content', () => {
    const page = createPage({ items: [1, 2], totalCount: 2, pageNumber: 1, pageSize: 20 });
    expect(page.isEmpty).toBe(false);
  });

  it('totalPages rounds up for non-exact division', () => {
    const page = createPage({ items: [], totalCount: 55, pageNumber: 1, pageSize: 20 });
    expect(page.totalPages).toBe(3);
  });

  it('totalPages is exact for exact division', () => {
    const page = createPage({ items: [], totalCount: 40, pageNumber: 1, pageSize: 20 });
    expect(page.totalPages).toBe(2);
  });

  it('hasNextPage is true when more items remain', () => {
    const page = createPage({ items: [], totalCount: 50, pageNumber: 1, pageSize: 20 });
    expect(page.hasNextPage).toBe(true);
  });

  it('hasNextPage is false on last page', () => {
    const page = createPage({ items: [], totalCount: 20, pageNumber: 1, pageSize: 20 });
    expect(page.hasNextPage).toBe(false);
  });

  it('hasPreviousPage is false on page 1', () => {
    const page = createPage({ items: [], totalCount: 100, pageNumber: 1, pageSize: 20 });
    expect(page.hasPreviousPage).toBe(false);
  });

  it('hasPreviousPage is true on page 2', () => {
    const page = createPage({ items: [], totalCount: 100, pageNumber: 2, pageSize: 20 });
    expect(page.hasPreviousPage).toBe(true);
  });
});

describe('PaginationRequest', () => {
  it('defaults to pageNumber=1, pageSize=20, cursor=undefined', () => {
    const req = createPaginationRequest();
    expect(req.pageNumber).toBe(1);
    expect(req.pageSize).toBe(20);
    expect(req.cursor).toBeUndefined();
  });

  it('accepts custom values', () => {
    const req = createPaginationRequest({ pageNumber: 3, pageSize: 10, cursor: 'next' });
    expect(req.pageNumber).toBe(3);
    expect(req.pageSize).toBe(10);
    expect(req.cursor).toBe('next');
  });
});
