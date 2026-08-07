export class SyzygyErrorCode {
  readonly rawValue: string;

  constructor(rawValue: string) {
    this.rawValue = rawValue;
  }

  equals(other: SyzygyErrorCode): boolean {
    return this.rawValue === other.rawValue;
  }

  toString(): string {
    return this.rawValue;
  }

  static readonly unknown = new SyzygyErrorCode('unknown');
  static readonly cancelled = new SyzygyErrorCode('cancelled');
  static readonly timeout = new SyzygyErrorCode('timeout');
  static readonly unauthenticated = new SyzygyErrorCode('unauthenticated');
  static readonly forbidden = new SyzygyErrorCode('forbidden');
  static readonly notFound = new SyzygyErrorCode('not_found');
  static readonly serverError = new SyzygyErrorCode('server_error');
  static readonly networkUnavailable = new SyzygyErrorCode('network_unavailable');
  static readonly decodingFailed = new SyzygyErrorCode('decoding_failed');
  static readonly encodingFailed = new SyzygyErrorCode('encoding_failed');
}
