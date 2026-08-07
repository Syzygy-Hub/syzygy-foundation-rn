import type { StorageProvider } from '../../contracts/storage/StorageProvider';
import type { StorageKey } from '../../contracts/storage/StorageKey';

export class MockStorageProvider implements StorageProvider {
  private storage = new Map<string, unknown>();

  async get<T>(key: StorageKey<T>): Promise<T | undefined> {
    return (this.storage.get(key.identifier) as T | undefined) ?? key.defaultValue;
  }

  async set<T>(value: T, key: StorageKey<T>): Promise<void> {
    this.storage.set(key.identifier, value);
  }

  async remove<T>(key: StorageKey<T>): Promise<void> {
    this.storage.delete(key.identifier);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }

  inspect(): Record<string, unknown> {
    return Object.fromEntries(this.storage);
  }
}
