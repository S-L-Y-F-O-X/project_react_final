import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IMovie} from "../../interfaces";
import {movieService} from "../../services";

interface MoviesState {
    movies: IMovie[];
}

const initialState: MoviesState = {
    movies: []
};

type FetchMoviesPayload = {
    pageNumber: number;
    genreId?: string;
    searchQuery?: string;
};

const fetchMoviesAsync = createAsyncThunk(
    'movieSlice/fetchMovies',
    async (payload: FetchMoviesPayload, {rejectWithValue}) => {
        try {
            const {pageNumber, genreId, searchQuery} = payload;
            let response;

            if (genreId) {
                response = await movieService.fetchMoviesByGenre(Number(genreId), pageNumber);
            } else if (searchQuery) {
                response = await movieService.searchMovies(searchQuery, pageNumber);
            } else {
                response = await movieService.fetchMovies(pageNumber);
            }

            return response;
        } catch (error) {
            return rejectWithValue('Something went wrong');
        }
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesAsync.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
                state.movies = action.payload;
            });
    },
});

const {reducer: moviesReducer, actions: moviesActions} = moviesSlice;

export {
    moviesReducer,
    moviesActions,
    moviesSlice,
    fetchMoviesAsync
}