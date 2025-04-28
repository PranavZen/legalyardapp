/**
 * Ensures a value is treated as a string
 * @param value The value to convert to string
 * @returns The value as a string
 */
export const ensureString = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value);
};

/**
 * Ensures a value is treated as a number
 * @param value The value to convert to number
 * @returns The value as a number, or 0 if conversion fails
 */
export const ensureNumber = (value: any): number => {
  if (value === null || value === undefined) {
    return 0;
  }
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

/**
 * Preserves a numeric string as a string
 * This is useful for phone numbers, zip codes, etc. that should remain strings
 * even though they contain only digits
 * @param value The value to preserve as string
 * @returns The value with a string type guaranteed
 */
export const preserveNumericString = (value: any): string => {
  // If it's already a string, return it
  if (typeof value === 'string') {
    return value;
  }
  
  // If it's a number, convert to string
  if (typeof value === 'number') {
    return String(value);
  }
  
  // For null/undefined, return empty string
  if (value === null || value === undefined) {
    return '';
  }
  
  // For any other type, convert to string
  return String(value);
};
