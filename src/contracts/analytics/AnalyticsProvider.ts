import type { AnalyticsEvent } from './AnalyticsEvent';

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void;
  identify(userId: string, traits: Record<string, unknown>): void;
  reset(): void;
}
