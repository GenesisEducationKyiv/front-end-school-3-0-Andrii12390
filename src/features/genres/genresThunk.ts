import { api } from '@/lib/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGenres = createAsyncThunk('genres/fetchAll', async () => {
  const res = await api.get<string[]>('/api/genres');
  return res.data;
});
