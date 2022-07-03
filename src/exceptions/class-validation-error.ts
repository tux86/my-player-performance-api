import { ValidationError } from 'class-validator/types/validation/ValidationError';

export class ClassValidationError extends Error {
  errors: ValidationError[];

  constructor(message = 'class validation error', errors: ValidationError[]) {
    super();
    this.message = message;
    this.errors = errors;
  }
}
