/**
 * Utility functions for handling errors
 */

/**
 * Safely extracts an error message from an unknown error
 * @param error The error object (of unknown type)
 * @returns A string error message
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};
