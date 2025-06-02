import { createAsyncThunk } from '@reduxjs/toolkit';
import { type TTrack } from '@/types';
import { type RootState } from '@/app/store';
import { type IMetaData } from './tracksSlice';
import { api } from '@/lib/api';

export const createTrack = createAsyncThunk(
  'tracks/create',
  async (data: Omit<TTrack, 'id'>) => {
    const res = await api.post<TTrack>(`/api/tracks`, data);
    return res.data;
  }
);

export const fetchTracks = createAsyncThunk<
  { data: TTrack[]; meta: IMetaData },
  void,
  { state: RootState }
>('tracks/fetchAll', async (_, { getState }) => {
  const { filters } = getState();

  const params: Record<string, string | number> = {
    page: filters.page,
    limit: filters.limit,
  };

  if (filters.sort?.field) params.sort = filters.sort.field;
  if (filters.sort?.order) params.order = filters.sort.order;
  if (filters.search.trim()) params.search = filters.search.trim();
  if (filters.genre.trim()) params.genre = filters.genre.trim();

  const res = await api.get<{ data: TTrack[]; meta: IMetaData }>(
    `/api/tracks`,
    { params }
  );

  return res.data;
});

export const deleteTrack = createAsyncThunk(
  'tracks/deleteOne',
  async (id: string) => {
    await api.delete<TTrack>(`/api/tracks/${id}`);
    return id;
  }
);

export const editTrack = createAsyncThunk(
  'tracks/edit',
  async (data: TTrack) => {
    const res = await api.put<TTrack>(`/api/tracks/${data.id}`, data);
    return res.data;
  }
);

export const uploadTrackFile = createAsyncThunk(
  'tracks/uploadFile',
  async ({ id, file }: { id: string; file: File }) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post(`/api/tracks/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }
);

export const deleteTrackFile = createAsyncThunk(
  'tracks/deleteFile',
  async (id: string) => {
    const res = await api.delete<TTrack>(`/api/tracks/${id}/file`);
    return res.data;
  }
);

export const setActiveTrack = createAsyncThunk(
  'tracks/setActiveTrack',
  async (track: TTrack) => track
);

export const bulkDeleteTracks = createAsyncThunk(
  'tracks/bulkDelete',
  async (ids: string[]) => {
    await api.post<TTrack[]>(`/api/tracks/delete`, { ids });
    return ids;
  }
);
