[![React Native](https://img.shields.io/badge/React%20Native-TypeScript-7F77DD?style=flat)](https://reactnative.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-1D9E75?logo=typescript&logoColor=white&style=flat)](https://typescriptlang.org) [![CI](https://img.shields.io/github/actions/workflow/status/Syzygy-Hub/syzygy-foundation-rn/ci.yml?label=ci&style=flat)](https://github.com/Syzygy-Hub/syzygy-foundation-rn/actions/workflows/ci.yml) [![Version](https://img.shields.io/badge/version-1.0.0-D85A30?style=flat)](https://github.com/Syzygy-Hub/syzygy-foundation-rn/releases) [![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Syzygy-Hub/.github/main/brand/syzygy-banner-dark-1200.png">
  <img src="https://raw.githubusercontent.com/Syzygy-Hub/.github/main/brand/syzygy-banner-light-1200.png" alt="Syzygy" width="600">
</picture>

# syzygy-foundation-rn

Contracts, primitives, and shared types for the React Native Syzygy ecosystem — zero implementation, zero dependencies.

## About

syzygy-foundation-rn is the base layer every other Syzygy React Native library depends on. It defines the interfaces that Services implements, the value types that UI and Core consume, and the error types the whole stack shares. Nothing in Foundation has behaviour beyond property storage — no network calls, no platform APIs, no business logic. Swap any implementation in Services or Core by conforming to these contracts; Foundation never needs to change.

## Platforms

| Platform | Min Version | Package Manager | Status |
|---|---|---|---|
| React Native | 0.71+ | npm | ✅ Supported |

## Requirements

- React Native 0.71+
- TypeScript 5.0+
- Node.js 20+

## Installation

```bash
npm install syzygy-foundation-rn
```

```typescript
// Runtime
import { SyzygyID, NetworkClientProtocol } from 'syzygy-foundation-rn'

// Test support (test files only)
import { MockNetworkClient } from 'syzygy-foundation-rn/testing'
```

## Architecture

SyzygyFoundation exposes two entry points:

- **index.ts** — runtime exports. Import in your app and library source files.
- **testing.ts** — test support exports. Import in test files only.

**Depends on:** nothing

**Used by:** syzygy-ui-rn, syzygy-core-rn, syzygy-services-rn

For the full ecosystem architecture see [syzygy-ecosystem.md](https://github.com/Syzygy-Hub/.github/blob/main/engineering/architecture/syzygy-ecosystem.md).

## API

### Primitives

- `SyzygyID<T>` — phantom-typed identifier preventing accidental ID mixing
- `Page<T>` / `PaginationRequest` — paginated data structures
- `SyzygyTimestamp` / `SyzygyDuration` / `TimeProvider` — cross-platform time primitives
- `ValidationResult` / `ValidationRule` — validation contract and result type

### Contracts

- `NetworkClientProtocol` / `NetworkRequest` / `NetworkResponse` — networking contract
- `StorageProvider` / `StorageKey` — type-safe storage contract
- `AuthProvider` / `AuthToken` / `AuthState` — authentication contract
- `AnalyticsProvider` / `AnalyticsEvent` — analytics contract
- `LoggerProtocol` / `LogLevel` / `LogEntry` — logging contract
- `ConnectivityProvider` / `ConnectivityState` — connectivity contract

### Shared Types

- `SyzygyEnvironment` — debug / staging / production
- `SyzygyConfiguration` — app configuration contract
- `SyzygyBuildInfo` — consumer-injected build metadata
- `SyzygyVersion` — semantic version with comparison support

### Errors

- `SyzygyError` — base error interface
- `SyzygyErrorCode` — typed, extensible error codes
- `SyzygyErrorSeverity` — error severity levels

### Testing Support

Import from `syzygy-foundation-rn/testing` in test files only.

- `MockLogger`, `MockConnectivityProvider`, `MockAuthProvider`, `MockStorageProvider`, `MockNetworkClient`
- `SpyAnalyticsProvider`
- `Fixtures`, `FixedTimeProvider`

## Usage

### Implementing a contract

```typescript
import { NetworkClientProtocol, NetworkRequest, NetworkResponse, createNetworkResponse } from 'syzygy-foundation-rn';

class FetchNetworkClient implements NetworkClientProtocol {
  async execute(request: NetworkRequest): Promise<NetworkResponse> {
    const res = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body ? JSON.stringify(request.body) : undefined,
    });
    const data = await res.arrayBuffer();
    return createNetworkResponse({ statusCode: res.status, data, headers: {} });
  }
}
```

### Using a primitive

```typescript
import { SyzygyID, createSyzygyID } from 'syzygy-foundation-rn';

type User = { id: SyzygyID<'User'>; name: string };
type Post = { id: SyzygyID<'Post'>; title: string };

const userId = createSyzygyID<'User'>();
const postId = createSyzygyID<'Post'>();
// TypeScript prevents comparing userId === postId across phantom types
```

### Using test support

```typescript
import { MockNetworkClient, createNetworkResponse } from 'syzygy-foundation-rn/testing';

it('returns response from queue', async () => {
  const client = new MockNetworkClient();
  client.responses.push(createNetworkResponse({ statusCode: 200, data: new ArrayBuffer(0), headers: {} }));
  const result = await client.execute({ url: 'https://example.com', method: 'GET', headers: {}, timeoutSeconds: 30 });
  expect(result.statusCode).toBe(200);
});
```

## Platform Notes

- Async pattern: `Promise`
- `SyzygyError` extends `Error`
- `ConnectivityProvider`: controlled — pass `isOffline` prop (no first-party network detection)
- `SyzygyBuildInfo`: consumer-injected — populate at app startup

## Contributing

Contributions are welcome. Please follow the [Syzygy engineering standards](https://github.com/Syzygy-Hub/.github/tree/main/engineering/standards) when submitting pull requests.

### Local Development

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run clean` | Remove compiled output |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint violations |
| `npm run typecheck` | Type-check without emitting output |
| `npm run test` | Run Jest tests |

> `prepare` and `prebuild` are lifecycle hooks that run automatically — no need to call them directly.

## Releases

Releases follow the Syzygy commit-message flow:

1. Create branch `release/X.X.X`
2. Bump version in manifest and `syzygy.yml`
3. Update `CHANGELOG.md`
4. Open PR → `main`
5. Get approval and merge with commit message starting with **`release:`** (e.g. `release: 1.0.0`)
6. CI detects the `release:` prefix → reads version from `syzygy.yml` → creates git tag and GitHub Release automatically

See the [Syzygy Release Standard](https://github.com/Syzygy-Hub/.github/blob/main/engineering/standards/release-standard.md) for full details.

## License

MIT — see [LICENSE](LICENSE)
