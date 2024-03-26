import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IGenreMov} from "../../interfaces";
import {genreService} from "../../services";

interface GenresState {
    genres: IGenreMov[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: GenresState = {
    genres: [],
    status: 'idle',
};

const fetchGenresAsync = createAsyncThunk(
    'genres/fetchGenres',
    async () => {
        return await genreService.getGenres();
    }
);

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenresAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGenresAsync.fulfilled, (state, action: PayloadAction<IGenreMov[]>) => {
                state.genres = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchGenresAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

const {reducer: genresReducer, actions: genresActions} = genresSlice;

export {
    fetchGenresAsync,
    genresReducer,
    genresActions,
    genresSlice
}