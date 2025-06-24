import { describe, it, expect, vi } from 'vitest'
import * as apiModule from '@/lib/api'
import { R } from '@mobily/ts-belt'
import { fetchGenres } from '../genresThunk'

describe('fetchGenres thunk (white-box)', () => {
 it('With successful API response dispatches fulfilled action with genre data', async () => {
  const fakeData = ['rock', 'pop'];
  const dispatch = vi.fn();
  const getState = vi.fn();
  
  vi.spyOn(apiModule, 'safeApi')
    .mockResolvedValueOnce(R.Ok({ data: fakeData, status: 200 }));
    
  await fetchGenres()(dispatch, getState, undefined);
  
  expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
    type: 'genres/fetchAll/fulfilled',
    payload: fakeData
  }));
});

it('With failed API response dispatches rejected action with error details', async () => {
  const fakeError = { message: 'API error', status: 500 };
  const dispatch = vi.fn();
  const getState = vi.fn();
  
  vi.spyOn(apiModule, 'safeApi')
    .mockResolvedValueOnce(R.Error(fakeError));
    
  await fetchGenres()(dispatch, getState, undefined);
  
  expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
    type: 'genres/fetchAll/rejected',
    payload: fakeError,
    error: { message: expect.any(String) }
  }));
  
});
})
