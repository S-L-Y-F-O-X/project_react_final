import {apiService} from './apiService';

export interface MovieResponse {
    data: any;
}

const movieDetailsService = {
    fetchMovieDetails: async (movieId: number) => {
        const movieDetailsResponse = await apiService.get(`movie/${movieId}`, {});
        const movieCreditsResponse = await apiService.get(`movie/${movieId}/credits`, {});
        const movieDetails = movieDetailsResponse.data;
        const credits = movieCreditsResponse.data.cast;

        return {...movieDetails, actors: credits};
    },
};

export {movieDetailsService};