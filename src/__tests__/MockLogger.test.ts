import { MockLogger } from '../testing/mocks/MockLogger';
import { LogLevel } from '../contracts/logging/LogLevel';

describe('MockLogger', () => {
  let logger: MockLogger;
  beforeEach(() => {
    logger = new MockLogger();
  });

  it('records entries via convenience methods', () => {
    logger.info('hello');
    logger.debug('world');
    expect(logger.entries).toHaveLength(2);
  });

  it('entriesForLevel filters by log level', () => {
    logger.info('info one');
    logger.info('info two');
    logger.warning('warn');
    expect(logger.entriesForLevel(LogLevel.Info)).toHaveLength(2);
    expect(logger.entriesForLevel(LogLevel.Warning)).toHaveLength(1);
    expect(logger.entriesForLevel(LogLevel.Error)).toHaveLength(0);
  });

  it('clear empties all entries', () => {
    logger.info('message');
    logger.clear();
    expect(logger.entries).toHaveLength(0);
  });

  it('entries preserve message and level', () => {
    logger.error('something failed');
    expect(logger.entries[0].message).toBe('something failed');
    expect(logger.entries[0].level).toBe(LogLevel.Error);
  });

  it('critical records at critical level', () => {
    logger.critical('fatal issue');
    expect(logger.entriesForLevel(LogLevel.Critical)).toHaveLength(1);
  });

  it('debug records at debug level', () => {
    logger.debug('verbose info');
    expect(logger.entriesForLevel(LogLevel.Debug)).toHaveLength(1);
  });
});
