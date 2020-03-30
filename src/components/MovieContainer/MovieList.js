
import React from 'react';
import './MovieList.css';
import { Link } from 'react-router-dom';

const MovieList = ( { movieData, deleteMovie, addToWachedMovie, otherControls,upOrDown, showMovie } ) => {

    const list = movieData.map(( movie ) => {
        return (
            <div className='item' key={ movie['imdbID'] }  >
                <div className='txt-data'>
                    <Link to={`/${movie['imdbID']}`}>
                        <p onClick={ () => { showMovie( movie['imdbID'] ) } } className='title'>{ movie['Title'] }</p>
                    </Link>
                    <p className='genre'>{ movie['Genre'].split(',') }</p>
                    <p>{ movie['imdbRating'] }</p>
                </div>
                <div className='to-watch-item-controls'>
                    <button onClick={ () => { deleteMovie( movie ) } } className='item-btn delete'>del</button>
                    
                    {  otherControls &&
                        <div className='special-controls'>
                            <button onClick={ () => { addToWachedMovie( movie ) } } className='item-btn to-watched'>see</button>
                            <div className='arrow-controls'>
                                <button onClick={ () => { upOrDown( movie, false ) }} className='item-btn arrow-up'>arrow up</button>
                                <button onClick={ () => { upOrDown( movie, true ) }} className='item-btn arrow-down'>arrow down</button>
                            </div>
                        </div>    
                    }
                    
                </div>
            </div>    
        )
    })
    return (
        
            <div className='list-with-items'>
                { list }
            </div>
        
    );
}

export default MovieList;