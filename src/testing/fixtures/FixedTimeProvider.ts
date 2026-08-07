import type { TimeProvider } from '../../primitives/time/TimeProvider';
import { createSyzygyTimestamp, type SyzygyTimestamp } from '../../primitives/time/SyzygyTimestamp';
import { SyzygyDuration, type SyzygyDuration as SyzygyDurationType } from '../../primitives/time/SyzygyDuration';

export class FixedTimeProvider implements TimeProvider {
  fixedTime: SyzygyTimestamp;

  constructor(fixedTime: SyzygyTimestamp = createSyzygyTimestamp(0)) {
    this.fixedTime = fixedTime;
  }

  now(): SyzygyTimestamp {
    return this.fixedTime;
  }

  since(timestamp: SyzygyTimestamp): SyzygyDurationType {
    return SyzygyDuration.milliseconds(
      this.fixedTime.millisecondsSinceEpoch - timestamp.millisecondsSinceEpoch
    );
  }
}
