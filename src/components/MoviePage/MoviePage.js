import React from 'react';
import './MoviePage.css';


const MoviePage = ( { movieDetails } ) => {
   
        return (
            <div className='moviePage'>
                <div className='movie-container'>
                    <h1>{ movieDetails.Title }</h1>
                    <div className='movie-img-and-data'>
                        <img src={movieDetails.Poster} alt={`${movieDetails.Title}-img`} />
                        <div className='movie-data'>
                            <p>Genre: <br/><br/> { movieDetails.Genre } </p>
                            <p>Writer: <br/><br/> { movieDetails.Writer }</p>
                            <p>Director: <br/><br/> { movieDetails.Director }</p>
                            <p>Runtime: <br/><br/> { movieDetails.Runtime }</p>
                            <p>Released: <br/><br/> { movieDetails.Released }</p>
                            <p>Actors: <br/><br/> { movieDetails.Actors }</p>
                            <p>imdbRating: <br/><br/> { movieDetails.imdbRating }</p>
                            <p>About: <br/><br/> { movieDetails.Plot }</p>
                        </div>
                    </div>
                </div>
            </div>    
        )
    }

export default MoviePage;