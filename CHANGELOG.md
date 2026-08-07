# Changelog

All notable changes to `syzygy-foundation-rn` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [1.0.0] - 2026-08-06

### Added

#### Primitives
- `SyzygyID<T>` — generic typed opaque identifier; `equals`, `compareTo`, `generate`, `toString`, `toJSON`; `createSyzygyID` factory
- `Page<T>` — paginated result container with `hasNextPage`, `hasPreviousPage`, `isEmpty`, `totalPages`; `createPage` factory
- `PaginationRequest` — cursor and page-number pagination parameters; `createPaginationRequest` factory
- `SyzygyTimestamp` — millisecond-precision timestamp value type; `toDate`; `SyzygyTimestamp.now()` static factory
- `SyzygyDuration` — duration value type; `SyzygyDuration.milliseconds`, `.seconds`, `.minutes`, `.hours` static factories
- `TimeProvider` — interface for injectable time source
- `ValidationResult` — discriminated union (`valid` / `invalid`); `ValidationResult.valid()` and `.invalid(messages)` factories
- `ValidationRule<T>` — generic validation rule interface

#### Contracts — Network
- `NetworkMethod` — union type + const namespace (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`)
- `NetworkRequest` — request value type with `url`, `method`, `headers`, `body`, `timeoutSeconds`; `createNetworkRequest` factory (default 30 s)
- `NetworkResponse` — response value type with `statusCode`, `data`, `headers`, `isSuccess`, `isClientError`, `isServerError`; `createNetworkResponse` factory
- `NetworkClientProtocol` — `execute(request): Promise<NetworkResponse>` interface

#### Contracts — Storage
- `StorageKey<T>` — typed key with `identifier` and optional `defaultValue`; `createStorageKey` factory
- `StorageProvider` — async `get`, `set`, `remove`, `clear` interface (Promise-based for AsyncStorage compatibility)

#### Contracts — Auth
- `AuthToken` — `accessToken`, optional `refreshToken`, optional `expiresAt`; `isExpired` helper
- `AuthState` — discriminated union (`unauthenticated`, `authenticated`, `expired`, `refreshing`); `AuthState` namespace with factory methods and helpers
- `AuthProvider` — callback-based auth contract with `subscribe`, `authenticate`, `refresh`, `signOut`; `AuthStateListener` type

#### Contracts — Analytics
- `AnalyticsEvent` — `name`, `properties: Record<string, unknown>`, `timestamp`; `createAnalyticsEvent` factory
- `AnalyticsProvider` — `track`, `identify`, `reset` interface

#### Contracts — Logging
- `LogLevel` — `Debug(0)`, `Info(1)`, `Warning(2)`, `Error(3)`, `Critical(4)` enum
- `LogEntry` — `level`, `message`, `timestamp`, `metadata: Record<string, string>`, optional `error`
- `LoggerProtocol` — interface with `log`, `debug`, `info`, `warning`, `error`, `critical`
- `BaseLogger` — abstract class implementing convenience methods on top of abstract `log(entry)`

#### Contracts — Connectivity
- `ConnectivityState` — union type `'connected' | 'disconnected' | 'unknown'`; `isConnected` helper
- `ConnectivityProvider` — controlled state contract with `state`, `isConnected`, `subscribe`; `ConnectivityStateListener` type

#### Shared Types
- `SyzygyEnvironment` — union type `'debug' | 'staging' | 'production'` with `isDebug`, `isProduction` helpers
- `SyzygyConfiguration` — top-level app configuration: `environment`, `baseURL`, `buildInfo`, `version`
- `SyzygyBuildInfo` — consumer-injected `appName`, `bundleId`, `buildNumber`, `version`
- `SyzygyVersion` — semver value type; `SyzygyVersion.create`, `.toString`, `.compare`, `.current` namespace

#### Errors
- `SyzygyErrorSeverity` — `Info(0)`, `Warning(1)`, `Error(2)`, `Critical(3)` enum
- `SyzygyErrorCode` — typed error code class with `equals`, `toString`; static codes: `unknown`, `cancelled`, `timeout`, `unauthenticated`, `forbidden`, `notFound`, `serverError`, `networkUnavailable`, `decodingFailed`, `encodingFailed`
- `SyzygyError` — interface extending `Error` with `code`, `severity`, optional `underlyingError`

#### Testing (`testing` entry point — `devDependencies` / test files only)
- `MockLogger` — extends `BaseLogger`; captures entries; `entriesForLevel`, `clear`
- `MockConnectivityProvider` — controllable connectivity state with `setState` and `subscribe`
- `MockAuthProvider` — full `AuthProvider` mock with call counts and configurable `refreshResult`
- `MockStorageProvider` — in-memory async storage with `inspect` helper
- `MockNetworkClient` — queue-based network client with `responses`, `requests`, configurable `error`
- `SpyAnalyticsProvider` — records `trackedEvents`, `identifiedUsers`, `resetCallCount`; `eventsNamed` helper
- `Fixtures` — namespace with `syzygyId`, `authToken`, `networkRequest`, `networkResponse`, `analyticsEvent`, `logEntry`, `syzygyVersion` factory methods
- `FixedTimeProvider` — `TimeProvider` implementation pinned to a configurable timestamp

#### Repository
- `syzygy.yml` manifest added

### Changed
- CI lint step now fetches `.eslintrc.json` and `.prettierrc` from `Syzygy-Hub/.github/main/engineering/tooling/rn/`
- CI coverage step added: `--coverage --coverageReporters=text-summary` + summary written to `GITHUB_STEP_SUMMARY`
- `tooling/rn/.eslintrc.json` updated with documentation-only comment header
- README rewritten to Syzygy engineering standard

[Unreleased]: https://github.com/Syzygy-Hub/syzygy-foundation-rn/compare/1.0.0...HEAD
[1.0.0]: https://github.com/Syzygy-Hub/syzygy-foundation-rn/releases/tag/1.0.0
