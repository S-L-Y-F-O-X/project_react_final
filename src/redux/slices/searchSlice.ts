import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {IMovie} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    searchQuery: string;
    searchResults: IMovie[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IState = {
    searchQuery: "",
    searchResults: [],
    isLoading: false,
    error: null,
};

const fetchSearchResults = createAsyncThunk<
    IMovie[],
    string,
    {
        rejectValue: string;
    }
>("search/fetchSearchResults", async (query: string, {rejectWithValue}) => {
    try {
        const data = await movieService.searchMovies(query);
        return data;
    } catch {
        return rejectWithValue("Failed to fetch search results");
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});


const searchReducer = searchSlice.reducer;
const searchActions = {
    ...searchSlice.actions,
    fetchSearchResults,
};

export {
    fetchSearchResults,
    searchReducer,
    searchActions
}