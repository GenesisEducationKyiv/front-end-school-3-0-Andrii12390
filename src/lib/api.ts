import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from './config';
import type { ApiSuccess, ApiError } from '@/types';
import { Result, fromPromise } from 'neverthrow';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function safeApi<T>(
  promise: Promise<AxiosResponse<T>>
): Promise<Result<ApiSuccess<T>, ApiError>> {
  const result = await fromPromise(promise, (e: unknown): ApiError => {
    if (e instanceof Error && (e as AxiosError).isAxiosError) {
      const axiosErr = e as AxiosError;
      const resp = axiosErr.response;

      if (resp?.data && typeof resp.data === 'object' && 'error' in resp.data) {
        return {
          message: resp.data.error as string,
          status: resp.status,
        };
      }

      return {
        message: axiosErr.message,
        status: resp?.status,
      };
    }

    return { message: e instanceof Error ? e.message : String(e) };
  });

  return result.map((res) => ({
    data: res.data,
    status: res.status,
  }));
}

export const isApiError = (payload: unknown): payload is ApiError => {
  return (
    typeof payload === 'object' && payload !== null && 'message' in payload
  );
};
