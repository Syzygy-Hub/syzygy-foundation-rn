export interface SyzygyDuration {
  readonly milliseconds: number;
  readonly seconds: number;
  readonly minutes: number;
  readonly hours: number;
}

function createSyzygyDuration(ms: number): SyzygyDuration {
  return {
    milliseconds: ms,
    get seconds(): number { return ms / 1000; },
    get minutes(): number { return ms / 60000; },
    get hours(): number { return ms / 3600000; },
  };
}

export const SyzygyDuration = {
  milliseconds: (ms: number): SyzygyDuration => createSyzygyDuration(ms),
  seconds: (s: number): SyzygyDuration => createSyzygyDuration(s * 1000),
  minutes: (m: number): SyzygyDuration => createSyzygyDuration(m * 60000),
  hours: (h: number): SyzygyDuration => createSyzygyDuration(h * 3600000),
};
