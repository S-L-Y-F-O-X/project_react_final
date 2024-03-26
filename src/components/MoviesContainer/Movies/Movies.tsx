import React, {FC, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";

import css from './Movies.module.css';
import {Genres, Movie, Pagination} from "../../../components";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {useDarkMode} from "../../../hoc/DarkModeProvider";
import {fetchMoviesAsync} from "../../../redux";
import {IMovie} from "../../../interfaces";

const Movies: FC = () => {
    const {darkMode} = useDarkMode();
    const movies = useAppSelector((state: any) => state.movies.movies);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {genreId} = useParams<any>();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const currentPage = 1;

    useEffect(() => {
        dispatch(fetchMoviesAsync({pageNumber: currentPage, genreId, searchQuery: query}));
    }, [dispatch, genreId, query, location.search]);

    const handlePageChange = (pageNumber: number) => {
        dispatch(fetchMoviesAsync({pageNumber, genreId, searchQuery: query}));
    };

    return (
        <div>
            <div className={`${css.main} ${darkMode ? css.darkMode : ''}`}>
                <div className={css.leftBar}><Genres/></div>

                <div className={css.Movies}>
                    {movies.map((movie: IMovie) => <Movie key={movie.id} movie={movie}/>)}
                </div>
                <div className={css.rightBar}></div>
            </div>
            <Pagination currentPage={currentPage} onPageChange={handlePageChange}/>
        </div>
    );
};

export {Movies};