import axios, { AxiosError, AxiosResponse } from 'axios';
import { ZodSchema } from 'zod';
import { API_URL } from './config';
import type { ApiError } from '@/types';

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
        response?.data && typeof response.data === 'object' && 'error' in response.data
          ? String(response.data.error)
          : error.message,
      status: response?.status,
    };
  }

  return {
    message: error instanceof Error ? error.message : String(error),
  };
};

const parseResponseData = <T>(data: T, schema?: ZodSchema<T>): T => {
  if (!schema) return data;

  const parsed = schema.safeParse(data);

  if (parsed.success) {
    return parsed.data;
  }

  throw new Error('Invalid Response data');
};

export async function safeApi<T>(
  promise: Promise<AxiosResponse<T>>,
  schema?: ZodSchema<T>,
): Promise<T> {
  try {
    return parseResponseData((await promise).data, schema);
  } catch (error) {
    throw handleApiError(error);
  }
}
