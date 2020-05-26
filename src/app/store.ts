import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gifsReducer from '../features/gifsGrid/gifsSlice';

export const store = configureStore({
  reducer: {
    gifs: gifsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
