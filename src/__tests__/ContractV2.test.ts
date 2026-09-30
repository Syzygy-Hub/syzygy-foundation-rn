import { MockNetworkClient } from '../testing/mocks/MockNetworkClient';
import { MockConnectivityProvider } from '../testing/mocks/MockConnectivityProvider';
import { MockAuthProvider } from '../testing/mocks/MockAuthProvider';
import { SyzygyFoundationError, type SyzygyFoundationErrorCode } from '../sharedtypes/SyzygyFoundationError';

describe('ContractV2', () => {
  describe('MockNetworkClient', () => {
    it('dispose() can be called without error', () => {
      const client = new MockNetworkClient();
      expect(() => client.dispose()).not.toThrow();
    });
  });

  describe('MockConnectivityProvider', () => {
    it('dispose() can be called without error', () => {
      const provider = new MockConnectivityProvider();
      expect(() => provider.dispose()).not.toThrow();
    });
  });

  describe('MockAuthProvider', () => {
    it('canUseBiometric() returns boolean', () => {
      const provider = new MockAuthProvider();
      expect(typeof provider.canUseBiometric()).toBe('boolean');
    });

    it('authenticateWithBiometric() returns boolean (async)', async () => {
      const provider = new MockAuthProvider();
      const result = await provider.authenticateWithBiometric('Test reason');
      expect(typeof result).toBe('boolean');
    });

    it('refreshToken() returns boolean (async)', async () => {
      const provider = new MockAuthProvider();
      const result = await provider.refreshToken();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('SyzygyFoundationError', () => {
    const codes: SyzygyFoundationErrorCode[] = [
      'network',
      'authentication',
      'not_found',
      'timeout',
      'cancelled',
      'unknown',
    ];

    codes.forEach((code) => {
      it(`can be constructed with code '${code}' and has correct code property`, () => {
        const error = new SyzygyFoundationError(code);
        expect(error.code).toBe(code);
        expect(error.name).toBe('SyzygyFoundationError');
        expect(error).toBeInstanceOf(Error);
      });
    });
  });
});
