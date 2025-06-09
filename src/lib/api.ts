import axios, { AxiosError, AxiosResponse } from 'axios';
import { ZodSchema } from 'zod';
import { API_URL } from './config';
import type { ApiSuccess, ApiError } from '@/types';
import { R } from '@mobily/ts-belt';

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

const parseResponseData = <T extends {}>(
  data: T,
  schema?: ZodSchema<T>
): R.Result<T, ApiError> => {
  if (!schema) return R.Ok(data);

  const parsed = schema.safeParse(data);

  return parsed.success
    ? R.Ok(parsed.data)
    : R.Error({
        message: 'Invalid Response data',
      });
};

export async function safeApi<T extends {}>(
  promise: Promise<AxiosResponse<T>>,
  schema?: ZodSchema<T>
): Promise<R.Result<ApiSuccess<T>, ApiError>> {
  return promise.then(
    (res) => {
      const parsedRes = parseResponseData(res.data, schema);

      return R.map(parsedRes, (parsedData) => ({
        data: parsedData,
        status: res.status,
      }));
    },
    (err) => {
      return R.Error(handleApiError(err));
    }
  );
}
