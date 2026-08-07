import type { SyzygyEnvironment } from './SyzygyEnvironment';
import type { SyzygyBuildInfo } from './SyzygyBuildInfo';
import type { SyzygyVersion } from './SyzygyVersion';

export interface SyzygyConfiguration {
  readonly environment: SyzygyEnvironment;
  readonly baseURL: string;
  readonly buildInfo: SyzygyBuildInfo;
  readonly version: SyzygyVersion;
}
