import {createSlice} from '@reduxjs/toolkit';
import {ICocktail, IRating, ValidationError} from '../../types';
import {
  createCocktail,
  fetchAll,
  fetchCocktailRating,
  fetchCocktails,
  fetchMostPopularCocktails,
  fetchOneCocktail,
  patchRating,
} from './cocktailsThunk.ts';
import {RootState} from '../../app/store.ts';

interface CocktailsState {
  cocktails: ICocktail[];
  mostPopularCocktails: ICocktail[];
  totalPages: number;
  cocktail: ICocktail | null;
  ratings: IRating[];
  userLastRating: IRating | null;
  isOpen: boolean;
  query: string;
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: string;
  updateLoading: string;
  createError: ValidationError | null;
  error: boolean;
}

const initialState: CocktailsState = {
  cocktails: [],
  mostPopularCocktails: [],
  totalPages: 1,
  cocktail: null,
  ratings: [],
  userLastRating: null,
  isOpen: false,
  query: '',
  fetchLoading: false,
  createLoading: false,
  deleteLoading: '',
  updateLoading: '',
  createError: null,
  error: false,
};

const cocktailsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setOpen(state, {payload}) {
      state.isOpen = payload;
    },
    setQuery(state, {payload}) {
      state.query = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCocktails.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCocktails.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.cocktails = data.cocktails;
      state.totalPages = data.totalPages;
    });
    builder.addCase(fetchCocktails.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(fetchAll.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAll.fulfilled, (state, {payload: cocktails}) => {
      state.fetchLoading = false;
      state.cocktails = cocktails;
    });
    builder.addCase(fetchAll.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(fetchMostPopularCocktails.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchMostPopularCocktails.fulfilled, (state, {payload: cocktails}) => {
      state.fetchLoading = false;
      state.mostPopularCocktails = cocktails;
    });
    builder.addCase(fetchMostPopularCocktails.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(fetchOneCocktail.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchOneCocktail.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.cocktail = data.cocktail;
    });
    builder.addCase(fetchOneCocktail.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(fetchCocktailRating.pending, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchCocktailRating.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      if (data?.ratings) state.ratings = data.ratings;
      if (data?.userRating) {
        state.userLastRating = data.userRating;
      } else {
        state.userLastRating = null;
      }
    });
    builder.addCase(fetchCocktailRating.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(patchRating.pending, (state, {meta}) => {
      state.updateLoading = meta.arg.id;
    });
    builder.addCase(patchRating.fulfilled, (state) => {
      state.updateLoading = '';
    });
    builder.addCase(patchRating.rejected, (state) => {
      state.updateLoading = '';
      state.error = true;
    });

    builder.addCase(createCocktail.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createCocktail.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createCocktail.rejected, (state, {payload: error}) => {
      state.createLoading = false;
      state.createError = error || null;
    });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const {setOpen, setQuery} = cocktailsSlice.actions;

export const selectFetchOneLoading = (state: RootState) => state.cocktailsStore.fetchLoading;
