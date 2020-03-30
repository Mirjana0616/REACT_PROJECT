
import React from 'react';
import './MovieContainer.css';

import Filter from './Filter';
import MovieList from './MovieList';

const MovieContainer = ( { 
                            movieData,
                            title,
                            deleteMovie,
                            addToWachedMovie,
                            otherControls,
                            filter,
                            genres,
                            filterData,
                            filterGenres, 
                            upOrDown,
                            resetFilter,
                            showMovie
                         } ) => {
  
    return (   
        <div className='to-watch'>
            <h1 className='to-watch-section-title'>{ title }</h1>
            <div className='to-watch-section-data'>
                
                <MovieList
                    otherControls={ otherControls }
                    movieData={ movieData }
                    deleteMovie={ deleteMovie }
                    addToWachedMovie={ addToWachedMovie }
                    upOrDown={ upOrDown }
                    showMovie={ showMovie }
                />
                { filter && 
                    <Filter 
                        genres={ genres }
                        filterData={ filterData }
                        filterGenres={ filterGenres }
                        resetFilter={ resetFilter }
                    />
                }
            </div>
        </div>   
    )
}

export default MovieContainer;