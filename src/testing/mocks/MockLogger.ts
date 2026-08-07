import { BaseLogger } from '../../contracts/logging/LoggerProtocol';
import type { LogEntry } from '../../contracts/logging/LogEntry';
import { LogLevel } from '../../contracts/logging/LogLevel';

export class MockLogger extends BaseLogger {
  entries: LogEntry[] = [];

  log(entry: LogEntry): void {
    this.entries.push(entry);
  }

  entriesForLevel(level: LogLevel): LogEntry[] {
    return this.entries.filter((e) => e.level === level);
  }

  clear(): void {
    this.entries = [];
  }
}
