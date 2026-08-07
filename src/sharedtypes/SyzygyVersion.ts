export interface SyzygyVersion {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
  readonly prerelease?: string;
}

export const SyzygyVersion = {
  create(major: number, minor: number, patch: number, prerelease?: string): SyzygyVersion {
    return { major, minor, patch, prerelease };
  },
  toString(v: SyzygyVersion): string {
    return v.prerelease
      ? `${v.major}.${v.minor}.${v.patch}-${v.prerelease}`
      : `${v.major}.${v.minor}.${v.patch}`;
  },
  compare(a: SyzygyVersion, b: SyzygyVersion): number {
    if (a.major !== b.major) return a.major - b.major;
    if (a.minor !== b.minor) return a.minor - b.minor;
    return a.patch - b.patch;
  },
  current: { major: 1, minor: 0, patch: 0 } as SyzygyVersion,
};
