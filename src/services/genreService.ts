import {apiService} from "./apiService";
import {genres} from "../constants";

const genreService = {
    getGenres: async () => {
        const response = await apiService.get(genres, {});
        return response.data.genres;
    },
    getMoviesCountByGenre: async (genreId: number, page: number) => {
        const response = await apiService.get(`discover/movie?with_genres=${genreId}&page=${page}`);
        return response.data.total_results;
    }
};

export {genreService};