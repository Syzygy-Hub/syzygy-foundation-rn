import type { AnalyticsProvider } from '../../contracts/analytics/AnalyticsProvider';
import type { AnalyticsEvent } from '../../contracts/analytics/AnalyticsEvent';

export class SpyAnalyticsProvider implements AnalyticsProvider {
  trackedEvents: AnalyticsEvent[] = [];
  identifiedUsers: Array<{ userId: string; traits: Record<string, unknown> }> = [];
  resetCallCount = 0;

  track(event: AnalyticsEvent): void {
    this.trackedEvents.push(event);
  }

  identify(userId: string, traits: Record<string, unknown>): void {
    this.identifiedUsers.push({ userId, traits });
  }

  reset(): void {
    this.resetCallCount++;
  }

  eventsNamed(name: string): AnalyticsEvent[] {
    return this.trackedEvents.filter((e) => e.name === name);
  }
}
