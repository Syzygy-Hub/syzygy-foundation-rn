/**
 * Consumer-injected build metadata.
 * Foundation does not read from platform APIs (no NativeModules, no DeviceInfo).
 */
export interface SyzygyBuildInfo {
  readonly appName: string;
  readonly bundleId: string;
  readonly buildNumber: string;
  readonly version: string;
}
