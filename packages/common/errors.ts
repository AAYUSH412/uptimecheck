/**
 * Shared error codes used across all services.
 * Using string constants keeps error handling consistent
 * between API responses and log messages.
 */
export const ErrorCode = {
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_URL: 'INVALID_URL',
  NOT_FOUND: 'NOT_FOUND',
  DUPLICATE: 'DUPLICATE',
  RATE_LIMITED: 'RATE_LIMITED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  INVALID_SIGNATURE: 'INVALID_SIGNATURE',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

/** Standard error response shape returned by the REST API. */
export interface ApiErrorResponse {
  error: string;
  message?: string;
  code?: ErrorCode;
  details?: { field: string; message: string }[];
}
