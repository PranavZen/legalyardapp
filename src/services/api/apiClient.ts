import AsyncStorage from '@react-native-async-storage/async-storage';
import { processApiResponse, processApiResponseArray } from '../../utils/apiUtils';

// Base URL for API requests
const API_BASE_URL = 'https://api.legalyard.com'; // This would be replaced with your actual API URL

// Default headers for API requests
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Timeout for API requests (in milliseconds)
const REQUEST_TIMEOUT = 30000;

// Type definition for field type mapping
type FieldTypeMapping = Record<string, 'string' | 'number' | 'boolean'>;

/**
 * Create a promise that rejects after a specified timeout
 * @param ms Timeout in milliseconds
 * @returns Promise that rejects after timeout
 */
const timeoutPromise = (ms: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${ms}ms`));
    }, ms);
  });
};

/**
 * Get the authentication token from AsyncStorage
 * @returns Authentication token
 */
const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Make an API request
 * @param endpoint API endpoint
 * @param method HTTP method
 * @param data Request data
 * @param headers Additional headers
 * @returns Response data
 */
const apiRequest = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = await getAuthToken();

    const requestHeaders: Record<string, string> = {
      ...DEFAULT_HEADERS,
      ...headers,
    };

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (data && method !== 'GET') {
      requestOptions.body = JSON.stringify(data);
    }

    // Race between fetch and timeout
    const response = await Promise.race([
      fetch(url, requestOptions),
      timeoutPromise(REQUEST_TIMEOUT),
    ]) as Response;

    // Check if response is OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    // Parse response
    const responseData = await response.json();
    return responseData as T;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * Make a GET request
 * @param endpoint API endpoint
 * @param headers Additional headers
 * @param fieldTypes Optional mapping of field names to their expected types
 * @returns Response data with correct types
 */
export const get = <T>(
  endpoint: string,
  headers?: Record<string, string>,
  fieldTypes?: FieldTypeMapping
): Promise<T> => {
  return apiRequest<T>(endpoint, 'GET', undefined, headers)
    .then(data => fieldTypes ? processApiResponse(data, fieldTypes) : data);
};

/**
 * Make a GET request for an array of items
 * @param endpoint API endpoint
 * @param headers Additional headers
 * @param fieldTypes Optional mapping of field names to their expected types
 * @returns Array of response data with correct types
 */
export const getArray = <T>(
  endpoint: string,
  headers?: Record<string, string>,
  fieldTypes?: FieldTypeMapping
): Promise<T[]> => {
  return apiRequest<T[]>(endpoint, 'GET', undefined, headers)
    .then(data => fieldTypes ? processApiResponseArray(data, fieldTypes) : data);
};

/**
 * Make a POST request
 * @param endpoint API endpoint
 * @param data Request data
 * @param headers Additional headers
 * @param fieldTypes Optional mapping of field names to their expected types
 * @returns Response data with correct types
 */
export const post = <T>(
  endpoint: string,
  data: any,
  headers?: Record<string, string>,
  fieldTypes?: FieldTypeMapping
): Promise<T> => {
  return apiRequest<T>(endpoint, 'POST', data, headers)
    .then(responseData => fieldTypes ? processApiResponse(responseData, fieldTypes) : responseData);
};

/**
 * Make a PUT request
 * @param endpoint API endpoint
 * @param data Request data
 * @param headers Additional headers
 * @param fieldTypes Optional mapping of field names to their expected types
 * @returns Response data with correct types
 */
export const put = <T>(
  endpoint: string,
  data: any,
  headers?: Record<string, string>,
  fieldTypes?: FieldTypeMapping
): Promise<T> => {
  return apiRequest<T>(endpoint, 'PUT', data, headers)
    .then(responseData => fieldTypes ? processApiResponse(responseData, fieldTypes) : responseData);
};

/**
 * Make a DELETE request
 * @param endpoint API endpoint
 * @param headers Additional headers
 * @param fieldTypes Optional mapping of field names to their expected types
 * @returns Response data with correct types
 */
export const del = <T>(
  endpoint: string,
  headers?: Record<string, string>,
  fieldTypes?: FieldTypeMapping
): Promise<T> => {
  return apiRequest<T>(endpoint, 'DELETE', undefined, headers)
    .then(responseData => fieldTypes ? processApiResponse(responseData, fieldTypes) : responseData);
};
