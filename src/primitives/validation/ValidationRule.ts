import type { ValidationResult } from './ValidationResult';

export interface ValidationRule<T> {
  validate(value: T): ValidationResult;
}
