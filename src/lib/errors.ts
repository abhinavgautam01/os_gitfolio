// =============================================================================
// GitViz Pro — Custom Error Classes (SPEC §12)
// =============================================================================

/** Error codes used throughout the application */
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'USER_NOT_FOUND'
  | 'RATE_LIMIT'
  | 'AUTH_ERROR'
  | 'GITHUB_SERVER_ERROR'
  | 'CACHE_ERROR'
  | 'EXPORT_ERROR';

/**
 * Base application error class.
 * All custom errors extend this to provide a consistent `code` property
 * and a `toJSON()` method for serialization.
 */
export class AppError extends Error {
  public readonly code: ErrorCode;

  constructor(message: string, code: ErrorCode) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;

    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /** Serialize the error for API responses */
  toJSON(): { error: { code: ErrorCode; message: string } } {
    return {
      error: {
        code: this.code,
        message: this.message,
      },
    };
  }
}

/**
 * Thrown when user input fails validation (e.g. invalid username format).
 * Maps to HTTP 400 Bad Request.
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Invalid username. Usernames can only contain letters, numbers, and hyphens.') {
    super(message, 'VALIDATION_ERROR');
  }
}

/**
 * Thrown when a GitHub user is not found.
 * Maps to HTTP 404 Not Found.
 */
export class UserNotFoundError extends AppError {
  public readonly username: string;

  constructor(username: string) {
    super(`No GitHub user found with the username @${username}.`, 'USER_NOT_FOUND');
    this.username = username;
  }

  override toJSON() {
    return {
      error: {
        code: this.code as ErrorCode,
        message: this.message,
        username: this.username,
      },
    };
  }
}

/**
 * Thrown when GitHub API rate limit is exceeded.
 * Maps to HTTP 429 Too Many Requests.
 */
export class RateLimitError extends AppError {
  /** Number of seconds until the rate limit resets */
  public readonly retryAfter: number;

  constructor(retryAfter: number | Date) {
    const seconds =
      retryAfter instanceof Date
        ? Math.max(0, Math.ceil((retryAfter.getTime() - Date.now()) / 1000))
        : retryAfter;

    const minutes = Math.ceil(seconds / 60);
    super(
      `GitHub API rate limit hit. Try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
      'RATE_LIMIT'
    );
    this.retryAfter = seconds;
  }

  override toJSON() {
    return {
      error: {
        code: this.code as ErrorCode,
        message: this.message,
        retryAfter: this.retryAfter,
      },
    };
  }
}

/**
 * Thrown when authentication fails (e.g. expired session, revoked token).
 * Maps to HTTP 401 Unauthorized.
 */
export class AuthError extends AppError {
  constructor(message: string = 'Session expired. Please sign in again.') {
    super(message, 'AUTH_ERROR');
  }
}

/**
 * Thrown when GitHub's API returns a server error (5xx).
 * Maps to HTTP 502 Bad Gateway.
 */
export class GitHubServerError extends AppError {
  /** The HTTP status code returned by GitHub */
  public readonly status: number;

  constructor(
    status: number,
    message: string = 'GitHub is having issues right now. Data may be temporarily unavailable.'
  ) {
    super(message, 'GITHUB_SERVER_ERROR');
    this.status = status;
  }

  override toJSON() {
    return {
      error: {
        code: this.code as ErrorCode,
        message: this.message,
        status: this.status,
      },
    };
  }
}

/**
 * Thrown when cache operations fail (Redis down, corrupted data, etc.).
 * These errors are logged but not surfaced to users — the app falls back to direct API calls.
 */
export class CacheError extends AppError {
  constructor(message: string = 'Cache operation failed.') {
    super(message, 'CACHE_ERROR');
  }
}

/**
 * Thrown when chart/report export fails (e.g. out of memory, DOM serialization error).
 * Displayed as a client-side toast notification.
 */
export class ExportError extends AppError {
  constructor(message: string = 'Export failed. Try again or use a different format.') {
    super(message, 'EXPORT_ERROR');
  }
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Type guard to check if an unknown value is an AppError instance.
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Map an error to an HTTP response object.
 *
 * Returns an appropriate HTTP status code and a JSON body conforming
 * to the SPEC §12 error response shape. Unknown errors are mapped to 500.
 */
export function errorToResponse(error: unknown): { status: number; body: object } {
  if (error instanceof ValidationError) {
    return {
      status: 400,
      body: error.toJSON(),
    };
  }

  if (error instanceof UserNotFoundError) {
    return {
      status: 404,
      body: error.toJSON(),
    };
  }

  if (error instanceof RateLimitError) {
    return {
      status: 429,
      body: error.toJSON(),
    };
  }

  if (error instanceof AuthError) {
    return {
      status: 401,
      body: error.toJSON(),
    };
  }

  if (error instanceof GitHubServerError) {
    return {
      status: 502,
      body: error.toJSON(),
    };
  }

  if (error instanceof CacheError) {
    return {
      status: 200,
      body: error.toJSON(),
    };
  }

  if (error instanceof ExportError) {
    return {
      status: 500,
      body: error.toJSON(),
    };
  }

  // Unknown / unexpected errors
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.';

  return {
    status: 500,
    body: {
      error: {
        code: 'INTERNAL_ERROR',
        message,
      },
    },
  };
}
