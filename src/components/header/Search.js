import React from 'react';
import './Search.css';


const Search = ( { data, select, search, typing, handleOutsideClick } ) => {
    
    const podaci = data['Search'];
    const movieList = podaci.map(( card ) => {
        return (
            <div className='search-result' key={ card['imdbID'] }  >
                <p className='search-title'>{ card['Title'] }</p>
                <button className='search-add-btn' onClick={ () => { select( card ) } } >+</button>
            </div>    
        )
    })
    return (
        <div className='result-box' onChange={  handleOutsideClick } >
            <input className='search-input' type='text' id='search' placeholder='Search ...' onChange={ search } autoComplete='off' />
            { typing && 
                <div className='box-with-search-results'>
                    { movieList }
                </div>
            }
            
        </div>
    );
}

export default Search;