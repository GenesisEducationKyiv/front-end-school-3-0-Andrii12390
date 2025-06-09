import { api, safeApi } from '@/lib/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiError } from '@/types';
import { genresResponseSchema } from '@/lib/schemas';
import { R } from '@mobily/ts-belt';

export const fetchGenres = createAsyncThunk<
  string[],
  void,
  { rejectValue: ApiError }
>('genres/fetchAll', async (_arg, { rejectWithValue }) => {
  const result = await safeApi<string[]>(
    api.get<string[]>('/api/genres'),
    genresResponseSchema
  );

  if (R.isError(result)) {
    return rejectWithValue(result._0);
  }

  return result._0.data;
});
