import type { SyzygyTimestamp } from './SyzygyTimestamp';
import type { SyzygyDuration } from './SyzygyDuration';

export interface TimeProvider {
  now(): SyzygyTimestamp;
  since(timestamp: SyzygyTimestamp): SyzygyDuration;
}
