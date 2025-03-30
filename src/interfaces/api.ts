export interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface RequestOptions {
  headers?: HeadersInit;
  signal?: AbortSignal;
  timeout?: number;
}

export interface ApiConfig {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
  timeout?: number;
} 