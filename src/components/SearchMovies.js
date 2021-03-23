import React, { useState } from "react";
import Loader from "react-loader-spinner";
import MoviesList from "./MoviesList.js";

export default function SearchMovies() {

    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies
    const [movies, setMovies] = useState([]);
    //keep track of search operation
    const [searching, setSearching] = useState(false);
    //to display the error message
    const [message, setMessage] = useState(null);
    //to store total pages  
    const [pageCount, setPageCount] = useState(0);
    //to determine current page for paggination
    const [currentPage, setcurrentPage] = useState(1);
    //to keep track of input change
    const [isDirty, setDirty] = useState(false);


    /**
     * search for movies based on the query name
     * @param e 
     */
    const searchMovies = async (e) => {
        e.preventDefault();        
        setcurrentPage(currentPage+1);
        setSearching(true);
        const url = `https://api.themoviedb.org/3/search/movie?api_key=d1217855f38a1bce208570b648feff3f&language=en-US&query=${query}&page=${currentPage}&include_adult=false`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.results && data.results.length > 0) {
                setMessage(null);
                setMovies(data.results);
                setPageCount(data.total_pages);
            }
            else {
                setMessage('Sorry, no movies found by name ' + {query}.query);
            }
            setDirty(false);
            setSearching(false);
        } catch (err) {
            console.error(err);
            setDirty(false);
            setSearching(false);
            setMessage('An unexpected error occured.')
        }
    }
    /**
     * when there is change in the query than updateQuery method is called
     * @param  e 
     */
    const updateQuery = (e) => {
        setQuery(e.target.value);
        setDirty(true);
        setcurrentPage(1);
    }

    return (
        <>
            <div className="header">
                <h1 className="title">Welcome to Movie Search App</h1>
                <form className="form" onSubmit={searchMovies}>
                    <input className="input" type="text" name="query"
                        placeholder="Please enter a movie name"
                        value={query} onChange={updateQuery}
                    />
                    <button className="button" disabled={!query || !isDirty} type="submit">Search</button>
                </form>
            </div>

            <div className="movie-card-list">
                {searching && !message ? (<span className="loader"><Loader type="ThreeDots" color="#00ff00" height={100} width={100} /></span>) : message ? (<div className="message"><h1>{message}</h1></div>) :
                    movies.filter(movie => movie.poster_path).map(movie => (
                        <MoviesList movie={movie} key={movie.id} />
                    ))}
            </div>
            {!searching && message == null && pageCount >= currentPage ? (
				<div className="button-next">
                    <button className="next" onClick={searchMovies}>Next page</button>
                </div>
			) : ""} 
        </>
    )
}