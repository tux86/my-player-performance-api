export class ClassValidationError extends Error {
  errors: any[];
  constructor(message = 'class validation error', errors: any[]) {
    super();
    this.message = message;
    this.errors = errors;
  }
}
