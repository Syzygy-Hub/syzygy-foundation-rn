export type ValidationResult =
  | { readonly kind: 'valid'; readonly isValid: true; readonly messages: [] }
  | { readonly kind: 'invalid'; readonly isValid: false; readonly messages: string[] };

export const ValidationResult = {
  valid(): ValidationResult {
    return { kind: 'valid', isValid: true, messages: [] };
  },
  invalid(messages: string[]): ValidationResult {
    return { kind: 'invalid', isValid: false, messages };
  },
};
