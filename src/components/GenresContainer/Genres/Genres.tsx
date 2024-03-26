import React, {useEffect} from "react";

import css from './Genres.module.css';
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {fetchGenresAsync} from "../../../redux";
import {Genre} from "../Genre";

const Genres = () => {
    const dispatch = useAppDispatch();
    const genres = useAppSelector((state) => state.genres.genres);
    const status = useAppSelector((state) => state.genres.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGenresAsync());
        }
    }, [dispatch, status]);

    return (
        <div className={css.Genres}>
            <h1>Genres</h1>
            {genres.map((genre) => (
                <Genre key={genre.id} genre={genre}/>
            ))}
        </div>
    );
};

export {Genres};