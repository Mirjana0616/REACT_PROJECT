import React from 'react';
import './toWatch.css';

import ToWatchList from './ToWatchList';

const ToWatch = ( { firebaseDataList } ) => {
   
        return (
            <div className='to-watch'>
                <h1 className='to-watch-section-title'>to watch</h1>
                <ToWatchList
                    firebaseDataList={ firebaseDataList }
                />
            </div>    
        )
    }

export default ToWatch;