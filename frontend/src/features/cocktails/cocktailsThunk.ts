import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosApi} from '../../axiosApi.ts';
import {
    ICocktail,
    ICocktailApi,
    ICocktailApiMutation,
    ICocktailMutation,
    ICocktailQuery,
    IRatingMutation,
    ValidationError
} from '../../types';
import {RootState} from "../../app/store.ts";
import {isAxiosError} from "axios";

export const fetchCocktails = createAsyncThunk<ICocktail[], ICocktailQuery | undefined>(
    'cocktail/fetchAll',
    async (query) => {
        const {data} = await axiosApi<ICocktail[]>(
            `cocktails?unpublished=${query ? query.unpublished : ''}&userUnpublished=${
                query ? query.userUnpublished : ''
            }`,
        );
        return data;
    },
);

export const fetchOneCocktail = createAsyncThunk<ICocktailMutation, string, { state: RootState }>(
    'cocktail/fetchOne',
    async (id, {getState}) => {
        const user = getState().usersStore.user;
        const {data} = await axiosApi<ICocktail>(`cocktails/${id}`);
        const rating = data?.ratings.find((item) => item.user === user?._id);
        return {cocktail: data, rating};
    },
);

export const patchRating = createAsyncThunk<void, IRatingMutation>(
    'cocktail/patchRating',
    async ({id, rating}) => {
        await axiosApi.patch(`cocktails/${id}`, {rating});
    },
);

export const createCocktail = createAsyncThunk<void, ICocktailApi, { rejectValue: ValidationError }>(
    'cocktail/create',
    async (cocktailMutation, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(cocktailMutation) as (keyof ICocktailApi)[];

            keys.forEach((key) => {
                const value = cocktailMutation[key];

                if (value) {
                    formData.append(key, value);
                }
            });

            await axiosApi.post(`cocktails/`, formData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }

            throw e;
        }
    }
);

export const updateCocktail = createAsyncThunk<void, ICocktailApiMutation, { rejectValue: ValidationError }>(
    'cocktail/update',
    async (cocktailMutation, {rejectWithValue}) => {
        try {
            await axiosApi.put(`cocktails/${cocktailMutation._id}`, cocktailMutation);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }

            throw e;
        }
    }
);
