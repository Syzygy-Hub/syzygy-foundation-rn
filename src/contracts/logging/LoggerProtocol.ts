import type { LogEntry } from './LogEntry';
import { LogLevel } from './LogLevel';
import { SyzygyTimestamp } from '../../primitives/time/SyzygyTimestamp';

export interface LoggerProtocol {
  log(entry: LogEntry): void;
  debug(message: string, metadata?: Record<string, string>): void;
  info(message: string, metadata?: Record<string, string>): void;
  warning(message: string, metadata?: Record<string, string>): void;
  error(message: string, error?: Error, metadata?: Record<string, string>): void;
  critical(message: string, error?: Error, metadata?: Record<string, string>): void;
}

/**
 * Base class with default implementations of the convenience methods.
 * Consumers extend this and implement only log().
 */
export abstract class BaseLogger implements LoggerProtocol {
  abstract log(entry: LogEntry): void;

  debug(message: string, metadata: Record<string, string> = {}): void {
    this.log({ level: LogLevel.Debug, message, timestamp: SyzygyTimestamp.now(), metadata });
  }

  info(message: string, metadata: Record<string, string> = {}): void {
    this.log({ level: LogLevel.Info, message, timestamp: SyzygyTimestamp.now(), metadata });
  }

  warning(message: string, metadata: Record<string, string> = {}): void {
    this.log({ level: LogLevel.Warning, message, timestamp: SyzygyTimestamp.now(), metadata });
  }

  error(message: string, error?: Error, metadata: Record<string, string> = {}): void {
    this.log({ level: LogLevel.Error, message, timestamp: SyzygyTimestamp.now(), metadata, error });
  }

  critical(message: string, error?: Error, metadata: Record<string, string> = {}): void {
    this.log({ level: LogLevel.Critical, message, timestamp: SyzygyTimestamp.now(), metadata, error });
  }
}
