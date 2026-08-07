import { FixedTimeProvider } from '../testing/fixtures/FixedTimeProvider';
import { createSyzygyTimestamp } from '../primitives/time/SyzygyTimestamp';

describe('FixedTimeProvider', () => {
  it('now() returns the fixed time', () => {
    const fixed = createSyzygyTimestamp(5_000);
    const provider = new FixedTimeProvider(fixed);
    expect(provider.now().millisecondsSinceEpoch).toBe(5_000);
  });

  it('since() computes duration from fixedTime to the given timestamp', () => {
    const provider = new FixedTimeProvider(createSyzygyTimestamp(10_000));
    const earlier = createSyzygyTimestamp(3_000);
    const duration = provider.since(earlier);
    expect(duration.milliseconds).toBe(7_000);
  });

  it('fixedTime can be mutated to advance time', () => {
    const provider = new FixedTimeProvider(createSyzygyTimestamp(0));
    provider.fixedTime = createSyzygyTimestamp(99_000);
    expect(provider.now().millisecondsSinceEpoch).toBe(99_000);
  });
});
