export interface SyzygyTimestamp {
  readonly millisecondsSinceEpoch: number;
  readonly secondsSinceEpoch: number;
  toDate(): Date;
}

export function createSyzygyTimestamp(millisecondsSinceEpoch: number): SyzygyTimestamp {
  return {
    millisecondsSinceEpoch,
    get secondsSinceEpoch(): number { return millisecondsSinceEpoch / 1000; },
    toDate(): Date { return new Date(millisecondsSinceEpoch); },
  };
}

export const SyzygyTimestamp = {
  now(): SyzygyTimestamp {
    return createSyzygyTimestamp(Date.now());
  },
};
