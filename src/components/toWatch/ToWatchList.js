import React from 'react';
import './ToWatchList';


const ToWatchList = ( { firebaseDataList } ) => {
    // const podaci = data['ToWatchList'];
    const toWatchList = firebaseDataList.map(( movie ) => {
        return (
            <div className='item' key={ movie['imdbID'] }  >
                <p className='title'>{ movie['Title'] }</p>
                <div className='to-watch-item-controls'>
                    <button className='item-btn to-watched'>see</button>
                    <button className='item-btn delete'>del</button>
                    <div className='arrow-controls'>
                        <button className='item-btn arrow-up'>arrow up</button>
                        <button className='item-btn arrow-down'>arrow down</button>
                    </div>
                </div>
            </div>    
        )
    })
    return (
        <div  >
            <div className='list-with-items'>
                { toWatchList }
            </div>
        </div>
    );
}

export default ToWatchList;