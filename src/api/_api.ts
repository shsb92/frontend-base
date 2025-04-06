import type { ApiResponse, RequestOptions, ApiConfig } from '@/interfaces/api';

// Custom error class for API errors
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Initialize API configuration
const apiConfig: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || '',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};

/**
 * Handles API request timeouts
 */
const timeoutPromise = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new ApiError('Request timeout', 408)), ms);
  });
}

/**
 * Makes a HTTP request with JSON data
 */
export async function httpRequest<T = unknown>(
  endpoint: string,
  options: RequestInit & RequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    const signal = options.signal || controller.signal;
    const timeout = apiConfig.timeout || 30000;

    // Prepare URL
    const url = endpoint.startsWith('http') 
      ? endpoint 
      : `${apiConfig.baseUrl}${endpoint}`;

    // Prepare headers
    const headers = new Headers(apiConfig.defaultHeaders);
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    // Make request with timeout
    const response = await Promise.race([
      fetch(url, {
        ...options,
        headers,
        signal,
      }),
      timeoutPromise(timeout),
    ]);

    // Parse response
    let data = null;
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      data = await response.json();
    }

    if (!response.ok) {
      throw new ApiError(
        data?.message || response.statusText,
        response.status,
        data
      );
    }

    return {
      data,
      error: null,
      status: response.status,
    };

  } catch (error) {
    if (error instanceof ApiError) {
      return {
        data: null,
        error: error.message,
        status: error.status,
      };
    }
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500,
    };
  }
}

/**
 * Makes a HTTP request with FormData
 */
async function httpFormDataRequest<T = unknown>(
  endpoint: string,
  formData: FormData,
  options: Omit<RequestInit & RequestOptions, 'body'> = {}
): Promise<ApiResponse<T>> {
  // Remove Content-Type header to let browser set it with boundary
  const { headers, ...restOptions } = options;
  const customHeaders = new Headers(headers);
  customHeaders.delete('Content-Type');

  return httpRequest<T>(endpoint, {
    ...restOptions,
    method: 'POST',
    body: formData,
    headers: customHeaders,
  });
}

// Helper methods for common HTTP methods
export const api = {
  get: <T>(endpoint: string, options?: RequestInit & RequestOptions) => 
    httpRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data: unknown, options?: RequestInit & RequestOptions) =>
    httpRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown, options?: RequestInit & RequestOptions) =>
    httpRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestInit & RequestOptions) =>
    httpRequest<T>(endpoint, { ...options, method: 'DELETE' }),

  formData: <T>(endpoint: string, formData: FormData, options?: RequestInit & RequestOptions) =>
    httpFormDataRequest<T>(endpoint, formData, options),
};


