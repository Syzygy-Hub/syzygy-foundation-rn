import type { SyzygyTimestamp } from '../../primitives/time/SyzygyTimestamp';
import type { LogLevel } from './LogLevel';

/**
 * metadata uses Record<string, string> for strict type safety — consistent with
 * iOS/Android Foundation decisions. Use string coercion at call sites.
 *
 * Contrast with AnalyticsEvent.properties which uses Record<string, unknown> for
 * analytics flexibility (numbers, booleans, arrays are all valid analytics values).
 *
 * Note: error field is intentionally excluded from equality comparisons.
 */
export interface LogEntry {
  readonly level: LogLevel;
  readonly message: string;
  readonly timestamp: SyzygyTimestamp;
  readonly metadata: Record<string, string>;
  readonly error?: Error;
}
