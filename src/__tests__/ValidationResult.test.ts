import { ValidationResult } from '../primitives/validation/ValidationResult';

describe('ValidationResult', () => {
  it('valid().isValid is true', () => {
    expect(ValidationResult.valid().isValid).toBe(true);
  });

  it('valid().messages is empty', () => {
    expect(ValidationResult.valid().messages).toHaveLength(0);
  });

  it('valid().kind is valid', () => {
    expect(ValidationResult.valid().kind).toBe('valid');
  });

  it('invalid().isValid is false', () => {
    expect(ValidationResult.invalid(['too short']).isValid).toBe(false);
  });

  it('invalid().messages contains supplied strings', () => {
    const result = ValidationResult.invalid(['error one', 'error two']);
    expect(result.messages).toEqual(['error one', 'error two']);
  });

  it('invalid().kind is invalid', () => {
    expect(ValidationResult.invalid([]).kind).toBe('invalid');
  });
});
