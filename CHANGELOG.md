# Changelog

All notable changes to `syzygy-foundation-rn` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

### Changed

### Fixed

---

## [2.0.0] - 2026-09-29

### Added
- `dispose(): void` added to `NetworkClientProtocol` — cancels in-flight requests and releases resources held by the client.
- `dispose(): void` added to `ConnectivityProvider` — releases listeners, timers, and subscriptions held by the provider.
- `canUseBiometric(): boolean` added to `AuthProvider` — returns true if biometric authentication is available and enrolled on the device.
- `authenticateWithBiometric(reason: string): Promise<boolean>` added to `AuthProvider` — triggers the system biometric prompt; resolves to true on success, false on failure or cancellation.
- `refreshToken(): Promise<boolean>` added to `AuthProvider` — attempts to refresh the current auth token; resolves to true on success, false on failure.
- `SyzygyFoundationError` — typed error class with `code: SyzygyFoundationErrorCode` and optional `underlying?: Error`. Codes: `'network' | 'authentication' | 'not_found' | 'timeout' | 'cancelled' | 'unknown'`.
- `MockNetworkClient` updated to implement `dispose()`.
- `MockConnectivityProvider` updated to implement `dispose()`.
- `MockAuthProvider` updated to implement `canUseBiometric()`, `authenticateWithBiometric()`, and `refreshToken()`.

### Breaking Changes
- `NetworkClientProtocol` now requires `dispose(): void` — all concrete implementations must add this method.
- `ConnectivityProvider` now requires `dispose(): void` — all concrete implementations must add this method.
- `AuthProvider` now requires `refreshToken(): Promise<boolean>` — all concrete implementations must add this method.
- `SyzygyFoundationError` is exported from the main entry point; consumers should use it for Foundation-layer error handling.

---

## [1.2.0] - 2026-09-18

### Changed
- CI: aligned Node version to 20 in release workflow (publish job was previously using Node 24)

---

## [1.1.0] — 2026-09-03

### Changed
- Ecosystem repositioned as AI-enabled cross-platform engineering framework for mobile, web and enterprise
- CI workflow refactored — inline release job removed, release now handled by org-level tag-push workflow
- Lint configuration migrated to `Syzygy-Hub/.github/engineering/tooling/`
- Lint step reordered to run before build and test
- README updated with ecosystem architecture, shared contracts documentation, and release process

### Added
- `syzygy.yml` confirmed as canonical version source of truth
- Shared contracts section documenting `NetworkClientProtocol`, `AuthProvider`, `StorageProvider`, `LoggerProtocol`

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

[Unreleased]: https://github.com/Syzygy-Hub/syzygy-foundation-rn/compare/1.2.0...HEAD
[1.2.0]: https://github.com/Syzygy-Hub/syzygy-foundation-rn/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/Syzygy-Hub/syzygy-foundation-rn/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/Syzygy-Hub/syzygy-foundation-rn/releases/tag/1.0.0
