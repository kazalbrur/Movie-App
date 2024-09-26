import { createSlice } from '@reduxjs/toolkit';
import * as Functions from '../../../localStorage/localStorage';

const initialState = {
  which_movies: Functions.fetchWhichMovies(),
  which_tvShows: Functions.fetchWhichTVShows(), // Add TV shows to the initial state
  sorted_by: Functions.fetchSortedBy(),
  language: Functions.fetchLanguage(),
  input: Functions.fetchInput(),
};

const navigationBarSlice = createSlice({
  name: 'navigationBar',
  initialState: initialState,
  reducers: {
    setWhichMovies(state, action) {
      state.which_movies = action.payload;
      Functions.storeWhichMovies(state.which_movies);
    },
    setWhichTVShows(state, action) { // Add an action to set TV shows
      state.which_tvShows = action.payload;
      Functions.storeWhichTVShows(state.which_tvShows);
    },
    setSortedBy(state, action) {
      state.sorted_by = action.payload;
      Functions.storeSortedBy(state.sorted_by);
    },
    setLanguage(state, action) {
      state.language = action.payload;
      Functions.storeLanguage(state.language);
    },
    setInput(state, action) {
      state.input = action.payload;
      Functions.storeInput(state.input);
    },
  },
});

export default navigationBarSlice.reducer;
export const { setWhichMovies, setWhichTVShows, setSortedBy, setLanguage, setInput } = navigationBarSlice.actions;
