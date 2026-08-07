import { SyzygyTimestamp, type SyzygyTimestamp as SyzygyTimestampType } from '../../primitives/time/SyzygyTimestamp';

/**
 * properties uses Record<string, unknown> — not Record<string, string> — because analytics
 * values are heterogeneous (numbers, booleans, strings, arrays). Callers should use
 * JSON-serialisable primitives only; complex objects are not guaranteed to round-trip.
 *
 * Contrast with LogEntry.metadata which uses Record<string, string> for strict type safety.
 */
export interface AnalyticsEvent {
  readonly name: string;
  readonly properties: Record<string, unknown>;
  readonly timestamp: SyzygyTimestampType;
}

export function createAnalyticsEvent(
  name: string,
  properties: Record<string, unknown> = {}
): AnalyticsEvent {
  return { name, properties, timestamp: SyzygyTimestamp.now() };
}
