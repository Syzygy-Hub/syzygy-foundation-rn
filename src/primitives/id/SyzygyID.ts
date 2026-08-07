export class SyzygyID<T> {
  readonly rawValue: string;

  constructor(rawValue: string) {
    this.rawValue = rawValue;
  }

  static generate<T>(): SyzygyID<T> {
    return new SyzygyID<T>(crypto.randomUUID());
  }

  equals(other: SyzygyID<T>): boolean {
    return this.rawValue === other.rawValue;
  }

  compareTo(other: SyzygyID<T>): number {
    return this.rawValue < other.rawValue ? -1 : this.rawValue > other.rawValue ? 1 : 0;
  }

  toString(): string {
    return this.rawValue;
  }

  toJSON(): string {
    return this.rawValue;
  }
}
