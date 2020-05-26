import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gifsReducer from '../features/gifsGrid/gifsSlice';
import searchReducer from '../features/searchForm/searchSlice';

export const store = configureStore({
  reducer: {
    gifs: gifsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
