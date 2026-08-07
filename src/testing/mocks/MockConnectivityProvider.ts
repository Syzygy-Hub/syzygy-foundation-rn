import type {
  ConnectivityProvider,
  ConnectivityStateListener,
} from '../../contracts/connectivity/ConnectivityProvider';
import type { ConnectivityState } from '../../contracts/connectivity/ConnectivityState';
import { isConnected } from '../../contracts/connectivity/ConnectivityState';

export class MockConnectivityProvider implements ConnectivityProvider {
  private _state: ConnectivityState;
  private listeners: ConnectivityStateListener[] = [];

  constructor(initialState: ConnectivityState = 'connected') {
    this._state = initialState;
  }

  get state(): ConnectivityState {
    return this._state;
  }

  get isConnected(): boolean {
    return isConnected(this._state);
  }

  setState(newState: ConnectivityState): void {
    this._state = newState;
    this.listeners.forEach((l) => l(newState));
  }

  subscribe(listener: ConnectivityStateListener): () => void {
    this.listeners.push(listener);
    return (): void => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}
