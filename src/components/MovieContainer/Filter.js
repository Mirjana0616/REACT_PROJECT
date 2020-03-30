
import React from 'react';
import './Filter.css';


const Filter = ( { genres, filterData, filterGenres, resetFilter } ) => {

    const filterList = genres.map(( genre ) => {
        return (
            <li onClick={ () => { filterGenres( genre ) }} key={ genre } value={ genre } >{ genre }</li>  
        )
    })
  
    return (   
        <div className='filter'  >
            <button className='filter-btn' onClick={ () => filterData() }  >Filter</button>
            <ul>
                { filterList }
            </ul>
            <button className='filter-btn' onClick={ resetFilter } >reset filter</button>
        </div>
    )
}

export default Filter;

