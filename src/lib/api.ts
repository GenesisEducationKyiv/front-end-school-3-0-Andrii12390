import axios, { AxiosError, AxiosResponse } from 'axios';
import { ZodSchema } from 'zod';
import { API_URL } from './config';
import type { ApiSuccess, ApiError } from '@/types';
import { Result, fromPromise, ok, err } from 'neverthrow';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const { response } = error;
    return {
      message:
        response?.data &&
        typeof response.data === 'object' &&
        'error' in response.data
          ? String(response.data.error)
          : error.message,
      status: response?.status,
    };
  }
  return {
    message: error instanceof Error ? error.message : String(error),
  };
};

const parseResponseData = <T>(
  data: T,
  schema?: ZodSchema<T>
): Result<T, ApiError> => {
  if (!schema) {
    return ok(data as T);
  }
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return err({
      message: 'Invalid Response data',
    });
  }
  return ok(parsed.data);
};

export async function safeApi<T>(
  promise: Promise<AxiosResponse<T>>,
  schema?: ZodSchema<T>
): Promise<Result<ApiSuccess<T>, ApiError>> {
  return fromPromise(promise, handleApiError).andThen((res) =>
    parseResponseData(res.data, schema).map((parsedData) => ({
      data: parsedData,
      status: res.status,
    }))
  );
}

export const isApiError = (payload: unknown): payload is ApiError => {
  return (
    typeof payload === 'object' && payload !== null && 'message' in payload
  );
};
