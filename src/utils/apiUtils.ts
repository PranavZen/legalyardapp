import { preserveNumericString } from './typeUtils';

/**
 * Type definition for field type mapping
 */
type FieldTypeMapping = Record<string, 'string' | 'number' | 'boolean'>;

/**
 * Process API response to ensure correct types
 * @param data The API response data
 * @param fieldTypes Mapping of field names to their expected types
 * @returns Processed data with correct types
 */
export const processApiResponse = <T extends Record<string, any>>(
  data: T,
  fieldTypes: FieldTypeMapping
): T => {
  if (!data || typeof data !== 'object') {
    return data;
  }
  
  const result = { ...data };
  
  // Process each field according to its expected type
  Object.keys(fieldTypes).forEach((field) => {
    if (field in result) {
      const expectedType = fieldTypes[field];
      
      if (expectedType === 'string') {
        result[field] = preserveNumericString(result[field]);
      } else if (expectedType === 'number') {
        result[field] = Number(result[field]);
      } else if (expectedType === 'boolean') {
        result[field] = Boolean(result[field]);
      }
    }
  });
  
  return result;
};

/**
 * Process an array of API responses to ensure correct types
 * @param dataArray Array of API response data
 * @param fieldTypes Mapping of field names to their expected types
 * @returns Processed array with correct types
 */
export const processApiResponseArray = <T extends Record<string, any>>(
  dataArray: T[],
  fieldTypes: FieldTypeMapping
): T[] => {
  if (!Array.isArray(dataArray)) {
    return dataArray;
  }
  
  return dataArray.map((item) => processApiResponse(item, fieldTypes));
};

/**
 * Example usage:
 * 
 * // Define the expected types for your API response
 * const contactFieldTypes = {
 *   id: 'string',
 *   name: 'string',
 *   phoneNumber: 'string',
 *   age: 'number',
 *   zipCode: 'string',
 *   isActive: 'boolean'
 * };
 * 
 * // Process a single response
 * const contact = processApiResponse(apiResponse, contactFieldTypes);
 * 
 * // Process an array of responses
 * const contacts = processApiResponseArray(apiResponseArray, contactFieldTypes);
 */
