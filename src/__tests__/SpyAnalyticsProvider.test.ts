import { SpyAnalyticsProvider } from '../testing/spies/SpyAnalyticsProvider';
import { createAnalyticsEvent } from '../contracts/analytics/AnalyticsEvent';

describe('SpyAnalyticsProvider', () => {
  let spy: SpyAnalyticsProvider;
  beforeEach(() => {
    spy = new SpyAnalyticsProvider();
  });

  it('track records events', () => {
    spy.track(createAnalyticsEvent('button_tapped'));
    expect(spy.trackedEvents).toHaveLength(1);
    expect(spy.trackedEvents[0].name).toBe('button_tapped');
  });

  it('eventsNamed filters by name', () => {
    spy.track(createAnalyticsEvent('page_view'));
    spy.track(createAnalyticsEvent('button_tapped'));
    spy.track(createAnalyticsEvent('page_view'));
    expect(spy.eventsNamed('page_view')).toHaveLength(2);
    expect(spy.eventsNamed('button_tapped')).toHaveLength(1);
  });

  it('identify records userId and traits', () => {
    spy.identify('user-123', { plan: 'pro' });
    expect(spy.identifiedUsers).toHaveLength(1);
    expect(spy.identifiedUsers[0].userId).toBe('user-123');
    expect(spy.identifiedUsers[0].traits).toEqual({ plan: 'pro' });
  });

  it('reset increments resetCallCount', () => {
    spy.reset();
    spy.reset();
    expect(spy.resetCallCount).toBe(2);
  });

  it('track multiple events accumulates in order', () => {
    spy.track(createAnalyticsEvent('first'));
    spy.track(createAnalyticsEvent('second'));
    expect(spy.trackedEvents[0].name).toBe('first');
    expect(spy.trackedEvents[1].name).toBe('second');
  });
});
