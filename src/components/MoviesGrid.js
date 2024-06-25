import React, { useState } from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
    // creating a state for searching a movie
    const [searchTerm, setSearchTerm] = useState("");

    // creating a state for genre
    const [genre, setGenre] = useState("All Genres");

    // creating a state for rating
    const [rating, setRating] = useState("All");


    // Updating the 'searchTerm' state
    const handleSearchChange = (e) => {
        // e ---> event that will contain all the
        //        event information

        setSearchTerm(e.target.value);
    };

    // Updating the 'genre' state
    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    // Updating the 'rating' state
    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };


    // filter logic for movie and genre
    const matchesGenre = (movie, genre) => {
        return genre === 'All Genres' || movie.genre.toLowerCase() === genre.toLowerCase();
    }

    // filter logic for movie and rating
    const matchesRating = (movie, rating) => {
        switch(rating) {
            case 'All':
                return true;

            case 'Good':
                return movie.rating >= 8;

            case 'Ok':
                return movie.rating >= 5 && movie.rating < 8;

            case 'Bad':
                return movie.rating < 5;

            default:
                return false;
        }
    }

    // filter logic for movie and searchTerm
    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    }


    // filter logic for movies
    const filteredMovies = movies.filter(movie => 
        matchesGenre(movie, genre) && 
        matchesRating(movie, rating) &&
        matchesSearchTerm(movie, searchTerm)
        // First look for the genre, then look for the
        // rating and then look for the searchTerm
    );


    return (
        <div>

            <input 
                type='text'
                className='search-input'
                placeholder='Search movies...'
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <div className='filter-bar'>
                <div className='filter-slot'>
                    <label>Genre</label>
                    <select className='filter-dropdown' value={genre} onChange={handleGenreChange}>
                        <option>All Genres</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>
                </div>

                <div className='filter-slot'>
                    <label>Rating</label>
                    <select className='filter-dropdown' value={rating} onChange={handleRatingChange}>
                        <option>All</option>
                        <option>Good</option>
                        <option>Ok</option>
                        <option>Bad</option>
                    </select>
                </div>
            </div>

            <div className='movies-grid'>
                {
                    filteredMovies.map((movie) => (
                        <MovieCard 
                            key={movie.id}
                            movie={movie} 
                            toggleWatchlist={toggleWatchlist} 
                            isWatchlisted={watchlist.includes(movie.id)} 
                        ></MovieCard>
                    ))
                }
            </div>

        </div>
    );
}