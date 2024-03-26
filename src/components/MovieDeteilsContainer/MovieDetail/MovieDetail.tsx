import React, {useEffect, useState} from "react";

import css from './MovieDetail.module.css'
import {IActor, IGenre, IMovieDetail} from "../../../interfaces";
import {imageBaseURL} from "../../../constants";
import {movieDetailsService} from "../../../services";

interface IProps {
    movie: IMovieDetail;
}

const MovieDetail: React.FC<IProps> = ({movie}) => {
    const {title, homepage, overview, poster_path, release_date, genres, id} = movie;
    const [actors, setActors] = useState<IActor[]>([]);

    useEffect(() => {
        movieDetailsService.fetchMovieDetails(id)
            .then((movieDetails) => {
                setActors(movieDetails.actors.slice(0, 7));
            })
    }, [id]);

    return (
        <div className={css.MovieDetail}>
            <img src={`${imageBaseURL}${poster_path}`} alt={title}/>
            <div className={css.title_genre}>
                <h1>{title}</h1>
                <div className={css.genre}>
                    {Array.isArray(genres) && genres.map((genre: IGenre) => <p key={genre.id}>{genre.name}</p>)}
                </div>
                <hr/>
                <div className={css.info}>
                    {overview && <div>{overview}</div>}
                    <hr/>
                    {release_date && <div>Release date: {release_date}</div>}
                    {homepage && <a href={homepage}>{homepage} </a>}
                </div>

                <h2>Top 7 Actors:</h2>
                <div className={css.actors}>
                    {actors.map((actor: IActor) => (
                        <div className={css.actor} key={actor.id}>
                            <img src={`${imageBaseURL}${actor.profile_path}`} alt={'No photo'}/>
                            <div>{actor.name} <br/>as <br/>{actor.character}</div>
                        </div>

                    ))}
                </div>


            </div>
        </div>
    );
};

export {MovieDetail};