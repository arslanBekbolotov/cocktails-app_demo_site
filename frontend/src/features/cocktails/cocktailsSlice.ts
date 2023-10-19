import {createSlice} from '@reduxjs/toolkit';
import {ICocktail, ValidationError} from '../../types';
import {createCocktail, fetchCocktails, fetchOneCocktail, patchRating} from './cocktailsThunk.ts';
import {RootState} from "../../app/store.ts";

interface CocktailsState {
    cocktails: ICocktail[];
    cocktail: ICocktail | null;
    userLastRating: number;
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
    cocktail: null,
    userLastRating: 0,
    isOpen: false,
    query: "",
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCocktails.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCocktails.fulfilled, (state, {payload: cocktails}) => {
            state.fetchLoading = false;
            state.cocktails = cocktails;
        });
        builder.addCase(fetchCocktails.rejected, (state) => {
            state.fetchLoading = false;
            state.error = true;
        });

        builder.addCase(fetchOneCocktail.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchOneCocktail.fulfilled, (state, {payload: data}) => {
            state.fetchLoading = false;
            state.cocktail = data.cocktail;
            if (data.rating) {
                state.userLastRating = data.rating.rating;
            }
        });
        builder.addCase(fetchOneCocktail.rejected, (state) => {
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
