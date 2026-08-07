export type SyzygyEnvironment = 'debug' | 'staging' | 'production';

export const SyzygyEnvironment = {
  debug: 'debug' as const,
  staging: 'staging' as const,
  production: 'production' as const,
  isDebug: (env: SyzygyEnvironment): boolean => env === 'debug',
  isProduction: (env: SyzygyEnvironment): boolean => env === 'production',
};
