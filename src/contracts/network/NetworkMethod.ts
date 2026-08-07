export type NetworkMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

export const NetworkMethod = {
  GET: 'GET' as const,
  POST: 'POST' as const,
  PUT: 'PUT' as const,
  PATCH: 'PATCH' as const,
  DELETE: 'DELETE' as const,
  HEAD: 'HEAD' as const,
};
