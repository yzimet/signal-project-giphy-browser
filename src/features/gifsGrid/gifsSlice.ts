import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import {
  Gif,
  GifsResponse,
  getTrendingGifs,
  getSearchedGifs,
} from '../../api/giphyAPI';

interface GifsState {
  gifsById: Record<string, Gif>;
  visibleGifs: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GifsState = {
  gifsById: {},
  visibleGifs: [],
  isLoading: false,
  error: null,
};

const gifsSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    getGifsStart: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoading = true;
    },
    getGifsSuccess: (state, action: PayloadAction<GifsResponse>) => {
      const { data: gifs } = action.payload;
      state.isLoading = false;
      state.error = null;

      gifs.forEach((gif) => {
        state.gifsById[gif.id] = gif;
      });

      state.visibleGifs = gifs.map((gif) => gif.id);
    },
    getGifsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getGifsStart,
  getGifsSuccess,
  getGifsFailure,
} = gifsSlice.actions;

// thunk that performs async fetch logic
export const fetchGifs = (
  query: string,
  limit: number,
  offset: number
): AppThunk => async (dispatch) => {
  try {
    dispatch(getGifsStart());
    let gifs;
    if (query) {
      gifs = await getSearchedGifs(query, limit, offset);
    } else {
      gifs = await getTrendingGifs(limit, offset);
    }
    dispatch(getGifsSuccess(gifs));
  } catch (err) {
    dispatch(getGifsFailure(err.toString()));
  }
};

export default gifsSlice.reducer;
