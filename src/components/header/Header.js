import React from 'react';
import './Header.css';
import  logo from '../../assets/logo.gif'

import Search from './Search';

const Header = ( { data, select, search, typing, handleOutsideClick } ) => {
   
        return (
            <div className='header'>
                <div className='header-logo'>
                    <img src={ logo } alt='logo' />
                </div>
                <h1 className='header-title'>Movie Watch List</h1>
                <Search onClick={ handleOutsideClick }
                    data={ data }
                    select={ select }
                    search={ search }
                    typing={ typing }
                    handleOutsideClick={ handleOutsideClick }
                />
            </div>    
        )
    }

export default Header;