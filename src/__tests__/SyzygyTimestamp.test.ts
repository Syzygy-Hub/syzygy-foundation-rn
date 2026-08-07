import { SyzygyTimestamp, createSyzygyTimestamp } from '../primitives/time/SyzygyTimestamp';
import { SyzygyDuration } from '../primitives/time/SyzygyDuration';

describe('SyzygyTimestamp', () => {
  it('now() returns a value after year 2020', () => {
    const ts = SyzygyTimestamp.now();
    expect(ts.millisecondsSinceEpoch).toBeGreaterThan(1_577_836_800_000);
  });

  it('secondsSinceEpoch is milliseconds / 1000', () => {
    const ts = createSyzygyTimestamp(5_000);
    expect(ts.secondsSinceEpoch).toBe(5);
  });

  it('toDate returns a Date at the correct time', () => {
    const ts = createSyzygyTimestamp(1_000_000);
    expect(ts.toDate().getTime()).toBe(1_000_000);
  });
});

describe('SyzygyDuration', () => {
  it('seconds(1) is 1000 milliseconds', () => {
    expect(SyzygyDuration.seconds(1).milliseconds).toBe(1_000);
  });

  it('minutes(1) is 60000 milliseconds', () => {
    expect(SyzygyDuration.minutes(1).milliseconds).toBe(60_000);
  });

  it('hours(1) is 3600000 milliseconds', () => {
    expect(SyzygyDuration.hours(1).milliseconds).toBe(3_600_000);
  });

  it('seconds derived from milliseconds', () => {
    expect(SyzygyDuration.seconds(2).seconds).toBe(2);
  });

  it('minutes derived from milliseconds', () => {
    expect(SyzygyDuration.minutes(2).minutes).toBe(2);
  });
});
