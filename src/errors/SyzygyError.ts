import type { SyzygyErrorCode } from './SyzygyErrorCode';
import type { SyzygyErrorSeverity } from './SyzygyErrorSeverity';

export interface SyzygyError extends Error {
  readonly code: SyzygyErrorCode;
  readonly message: string;
  readonly severity: SyzygyErrorSeverity;
  readonly underlyingError?: Error;
}
