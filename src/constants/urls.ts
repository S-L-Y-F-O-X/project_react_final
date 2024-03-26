const baseURL = 'https://api.themoviedb.org/3';
const imageBaseURL = 'https://image.tmdb.org/t/p/w500';
const movie = '/discover/movie';
const genres = '/genre/movie/list';
const moviesByGenre = `${movie}?with_genres=`;
const movieDetails = 'movie/{movie_id}'
const moviesBySearch = `${baseURL}/search/movie?query=`;
const credits = '/movie/{movie_id}/credits';

export {
    baseURL,
    imageBaseURL,
    movie,
    genres,
    moviesByGenre,
    moviesBySearch,
    movieDetails,
    credits
};

