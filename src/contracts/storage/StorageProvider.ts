import type { StorageKey } from './StorageKey';

/**
 * Async storage contract — mirrors React Native's AsyncStorage signature.
 * All methods return Promises to support async-first storage backends.
 */
export interface StorageProvider {
  get<T>(key: StorageKey<T>): Promise<T | undefined>;
  set<T>(value: T, key: StorageKey<T>): Promise<void>;
  remove<T>(key: StorageKey<T>): Promise<void>;
  clear(): Promise<void>;
}
