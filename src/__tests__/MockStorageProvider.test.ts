import { MockStorageProvider } from '../testing/mocks/MockStorageProvider';

const key = { identifier: 'test-key' };

describe('MockStorageProvider', () => {
  let store: MockStorageProvider;
  beforeEach(() => {
    store = new MockStorageProvider();
  });

  it('set then get returns stored value', async () => {
    await store.set('hello', key);
    const result = await store.get<string>(key);
    expect(result).toBe('hello');
  });

  it('get returns undefined for missing key', async () => {
    const result = await store.get<string>(key);
    expect(result).toBeUndefined();
  });

  it('remove deletes the value', async () => {
    await store.set('hello', key);
    await store.remove(key);
    const result = await store.get<string>(key);
    expect(result).toBeUndefined();
  });

  it('clear empties all storage', async () => {
    await store.set('a', { identifier: 'key1' });
    await store.set('b', { identifier: 'key2' });
    await store.clear();
    expect(store.inspect()).toEqual({});
  });

  it('stores multiple keys independently', async () => {
    await store.set('valueA', { identifier: 'keyA' });
    await store.set('valueB', { identifier: 'keyB' });
    expect(await store.get<string>({ identifier: 'keyA' })).toBe('valueA');
    expect(await store.get<string>({ identifier: 'keyB' })).toBe('valueB');
  });
});
