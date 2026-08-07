import { SyzygyTimestamp, type SyzygyTimestamp as SyzygyTimestampType } from '../../primitives/time/SyzygyTimestamp';

export interface AuthToken {
  readonly accessToken: string;
  readonly refreshToken?: string;
  readonly expiresAt?: SyzygyTimestampType;
}

export function isExpired(token: AuthToken): boolean {
  if (!token.expiresAt) return false;
  return token.expiresAt.millisecondsSinceEpoch < SyzygyTimestamp.now().millisecondsSinceEpoch;
}
