import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {movieDetailsService} from "../../services";
import {IMovieDetail} from "../../interfaces";

interface MovieDetailsState {
    movie: IMovieDetail | null;
}

const initialState: MovieDetailsState = {
    movie: null,
};

const fetchMovieDetailsAsync = createAsyncThunk<IMovieDetail, number, {
    rejectValue: any;
}>('movieDetails/fetchMovieDetails', async (movieId, {rejectWithValue}) => {
    try {
        const data = await movieDetailsService.fetchMovieDetails(movieId);
        return data;
    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.response.data);
    }
});

const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetailsAsync.fulfilled, (state, action: PayloadAction<IMovieDetail>) => {
                state.movie = action.payload;
            });
    },
});

const {reducer: movieDetailsReducer, actions} = movieDetailsSlice;

const movieDetailsActions = {
    ...actions,
    fetchMovieDetailsAsync,
};

export {movieDetailsActions, movieDetailsReducer, fetchMovieDetailsAsync};