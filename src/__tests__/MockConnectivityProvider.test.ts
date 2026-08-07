import { MockConnectivityProvider } from '../testing/mocks/MockConnectivityProvider';

describe('MockConnectivityProvider', () => {
  it('default initial state is connected', () => {
    const provider = new MockConnectivityProvider();
    expect(provider.isConnected).toBe(true);
    expect(provider.state).toBe('connected');
  });

  it('setState to disconnected updates isConnected', () => {
    const provider = new MockConnectivityProvider();
    provider.setState('disconnected');
    expect(provider.isConnected).toBe(false);
  });

  it('setState to unknown updates state', () => {
    const provider = new MockConnectivityProvider();
    provider.setState('unknown');
    expect(provider.state).toBe('unknown');
    expect(provider.isConnected).toBe(false);
  });

  it('constructor initial state overrides default', () => {
    const provider = new MockConnectivityProvider('disconnected');
    expect(provider.isConnected).toBe(false);
  });

  it('subscribe notifies listeners on state changes', () => {
    const provider = new MockConnectivityProvider();
    const observed: string[] = [];
    provider.subscribe((s) => observed.push(s));
    provider.setState('disconnected');
    provider.setState('connected');
    expect(observed).toEqual(['disconnected', 'connected']);
  });
});
