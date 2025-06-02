import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from '../features/tracks/tracksSlice';
import genresReducer from '../features/genres/genresSlice';
import filterReducer from '../features/filters/filtersSlice';

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    genres: genresReducer,
    filters: filterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
