class BaseError extends Error {
  readonly error: string;
  readonly cause: string;
  readonly isOperational: boolean;

  constructor(error: string, cause: string, isOperational: boolean = true) {
    super(cause);
    this.error = error;
    this.cause = cause;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseError;

interface ErrorConfig {
  errorName: string;
  isOperational?: boolean;
}

export function createErrorType(config: ErrorConfig) {
  return class extends BaseError {
    constructor(cause: string) {
      super(config.errorName, cause, config.isOperational || true);

      this.name = config.errorName;
    }
  };
}
