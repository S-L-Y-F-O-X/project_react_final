import {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";

import css from './MovieDetails.module.css'
import {useAppSelector, useAppDispatch} from '../../../hooks';
import {fetchMovieDetailsAsync} from '../../../redux';
import {useDarkMode} from "../../../hoc/DarkModeProvider";
import {MovieDetail} from "../MovieDetail";

const MovieDetails: FC = () => {
    const {darkMode} = useDarkMode();
    const {movieId} = useParams();
    const dispatch = useAppDispatch();
    const movie = useAppSelector((state) => state.movieDetails.movie);

    useEffect(() => {
        dispatch(fetchMovieDetailsAsync(Number(movieId)));
    }, [dispatch, movieId]);

    return (
        <div className={`${css.MovieDetails} ${darkMode ? css.MovieDetailsDark : ''}`}>
            {movie && <MovieDetail movie={movie}/>}
        </div>
    );
};

export {MovieDetails};