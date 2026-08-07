export interface StorageKey<T> {
  readonly identifier: string;
  readonly defaultValue?: T;
}

export function createStorageKey<T>(identifier: string, defaultValue?: T): StorageKey<T> {
  return { identifier, defaultValue };
}
