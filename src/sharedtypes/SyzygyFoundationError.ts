export type SyzygyFoundationErrorCode =
  | 'network'
  | 'authentication'
  | 'not_found'
  | 'timeout'
  | 'cancelled'
  | 'unknown';

export class SyzygyFoundationError extends Error {
  readonly code: SyzygyFoundationErrorCode;
  readonly underlying?: Error;

  constructor(code: SyzygyFoundationErrorCode, message?: string, underlying?: Error) {
    super(message ?? code);
    this.name = 'SyzygyFoundationError';
    this.code = code;
    this.underlying = underlying;
  }
}
