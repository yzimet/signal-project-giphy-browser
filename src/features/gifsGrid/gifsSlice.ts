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
  page: number;
}

const initialState: GifsState = {
  gifsById: {},
  visibleGifs: [],
  isLoading: false,
  error: null,
  page: 1,
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

      // My idea was to optimize for a very long page, such that
      // we could theoretically show/hide gifs based on scroll position.
      // For now, just show all gifs that we have.
      state.visibleGifs = Object.keys(state.gifsById);
    },
    getGifsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    clear: (state) => {
      state.gifsById = {};
      state.visibleGifs = [];
      state.isLoading = false;
      state.error = null;
      state.page = 1;
    },
  },
});

export const {
  getGifsStart,
  getGifsSuccess,
  getGifsFailure,
  incrementPage,
  clear,
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
