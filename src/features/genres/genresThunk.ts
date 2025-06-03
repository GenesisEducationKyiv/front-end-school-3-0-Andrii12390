import { api, safeApi } from '@/lib/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiError } from '@/types';

export const fetchGenres = createAsyncThunk<
  string[],
  void,
  { rejectValue: ApiError }
>('genres/fetchAll', async (_arg, { rejectWithValue }) => {
  const result = await safeApi<string[]>(api.get<string[]>('/api/genres'));

  if (result.isErr()) {
    return rejectWithValue(result.error);
  }

  return result.value.data;
});
