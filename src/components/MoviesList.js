import React from "react";
import moment from 'moment'

function MoviesList({ movie }) {
    let formattedDate = moment(movie.release_date).format('MMMM Do YYYY');
    return (
        <div className="movie-card">
            <a href={`https://www.themoviedb.org/movie/${movie.id}?language=en-US`} target="_blank">
                <img className="movie-card-image"
                    src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2/${movie.poster_path}`}
                    alt={movie.title + ' poster'}
                />
            </a>
            <div className="movie-card-content">
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="date">{formattedDate}</p>
                <p className="movie-card-desc">{movie.overview}</p>
            </div>

        </div>
    )
}

export default MoviesList;