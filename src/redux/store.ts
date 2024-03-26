import {configureStore} from '@reduxjs/toolkit';

import {loadingReducer, moviesReducer, genresReducer, movieDetailsReducer, searchReducer} from "./slices";

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        movies: moviesReducer,
        genres: genresReducer,
        movieDetails: movieDetailsReducer,
        search: searchReducer
    }

});

export default store;
