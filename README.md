[![React Native](https://img.shields.io/badge/React%20Native-TypeScript-7F77DD?style=flat)](https://reactnative.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-1D9E75?logo=typescript&logoColor=white&style=flat)](https://typescriptlang.org) [![CI](https://img.shields.io/github/actions/workflow/status/Syzygy-Hub/syzygy-foundation-rn/ci.yml?label=ci&style=flat)](https://github.com/Syzygy-Hub/syzygy-foundation-rn/actions/workflows/ci.yml) [![Version](https://img.shields.io/badge/version-1.1.0-D85A30?style=flat)](https://github.com/Syzygy-Hub/syzygy-foundation-rn/releases) [![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Syzygy-Hub/.github/main/brand/assets/banners/syzygy-banner-dark-1200.png">
  <img src="https://raw.githubusercontent.com/Syzygy-Hub/.github/main/brand/assets/banners/syzygy-banner-light-1200.png" alt="Syzygy" width="600">
</picture>

# syzygy-foundation-rn

The root layer of the Syzygy ecosystem — providing SharedTypes, base protocols, and shared contracts that every peer layer builds on.

## About

syzygy-foundation-rn is the base layer every other Syzygy React Native library depends on. It defines the interfaces that Services implements, the value types that UI and Core consume, and the error types the whole stack shares. Nothing in Foundation has behaviour beyond property storage — no network calls, no platform APIs, no business logic. Swap any implementation in Services or Core by conforming to these contracts; Foundation never needs to change.

## Role in the Syzygy Ecosystem

`syzygy-foundation-rn` is the root layer — the only dependency shared by all peer layers. It depends on nothing. Every peer layer (UI, Core, Services, AI) depends on Foundation and nothing else.

Full ecosystem architecture: [ecosystem-fragment.md](https://github.com/Syzygy-Hub/.github/blob/main/docs/ecosystem-fragment.md)

### Shared Contracts

Foundation defines the shared contracts that all peer layers consume. These contracts are the abstraction layer that allows UI, Core, Services and AI to each depend on Foundation without depending on each other.

- **`NetworkClientProtocol`** — abstracts HTTP networking so any peer layer can make network requests without depending on a concrete implementation. `syzygy-services-rn` provides the concrete Axios implementation.
- **`AuthProvider`** — abstracts authentication and token management. `syzygy-services-rn` provides the concrete OAuth and SecureStorage implementations.
- **`StorageProvider`** — abstracts local persistence. `syzygy-services-rn` provides the concrete SecureStorage implementation.
- **`LoggerProtocol`** — abstracts logging and observability so all peer layers can log without depending on a specific logging framework.

> These contracts are currently defined as planned interfaces. Concrete implementations will ship with `syzygy-services-rn` in Phase 2 of the ecosystem roadmap.

## Release Process

Releases follow the Syzygy tag-push release flow:

1. Create a `release/X.X.X` branch
2. Bump the version in `syzygy.yml`, `package.json`, the README badge, and `CHANGELOG.md`
3. Open a PR to `main` and wait for CI to pass
4. Merge the PR
5. Push the tag: `git tag X.X.X` and `git push origin X.X.X`
6. The tag push triggers the org-level release workflow which validates `syzygy.yml` matches the tag, extracts the CHANGELOG entry, publishes to npm, and creates the GitHub Release

For the full release standard see the [Syzygy-Hub/.github release standard](https://github.com/Syzygy-Hub/.github/blob/main/engineering/standards/release-standard.md).

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

**Used by:** syzygy-ui-rn, syzygy-core-rn, syzygy-services-rn, syzygy-ai-rn

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

## License

MIT — see [LICENSE](LICENSE)
