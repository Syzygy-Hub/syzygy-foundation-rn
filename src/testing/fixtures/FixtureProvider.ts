import type { AuthToken } from '../../contracts/auth/AuthToken';
import { createNetworkRequest } from '../../contracts/network/NetworkRequest';
import { createNetworkResponse } from '../../contracts/network/NetworkResponse';
import type { NetworkRequest } from '../../contracts/network/NetworkRequest';
import type { NetworkResponse } from '../../contracts/network/NetworkResponse';
import { createAnalyticsEvent } from '../../contracts/analytics/AnalyticsEvent';
import type { AnalyticsEvent } from '../../contracts/analytics/AnalyticsEvent';
import { LogLevel } from '../../contracts/logging/LogLevel';
import type { LogEntry } from '../../contracts/logging/LogEntry';
import type { SyzygyVersion } from '../../sharedtypes/SyzygyVersion';
import { createSyzygyTimestamp } from '../../primitives/time/SyzygyTimestamp';
import { SyzygyID } from '../../primitives/id/SyzygyID';
import { NetworkMethod } from '../../contracts/network/NetworkMethod';

export interface FixtureProvider<T> {
  fixture(): T;
}

export const Fixtures = {
  syzygyId<T>(): SyzygyID<T> {
    return new SyzygyID<T>('fixture-id-00000000');
  },

  authToken(): AuthToken {
    return {
      accessToken: 'fixture-access-token',
      refreshToken: 'fixture-refresh-token',
    };
  },

  networkRequest(): NetworkRequest {
    return createNetworkRequest({
      url: 'https://fixture.syzygy.dev/api',
      method: NetworkMethod.GET,
      headers: {},
    });
  },

  networkResponse(): NetworkResponse {
    return createNetworkResponse({
      statusCode: 200,
      data: new Uint8Array(),
      headers: {},
    });
  },

  analyticsEvent(): AnalyticsEvent {
    return createAnalyticsEvent('test_event');
  },

  logEntry(): LogEntry {
    return {
      level: LogLevel.Info,
      message: 'fixture log message',
      timestamp: createSyzygyTimestamp(0),
      metadata: {},
    };
  },

  syzygyVersion(): SyzygyVersion {
    return { major: 1, minor: 0, patch: 0 };
  },
};
