import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header/Header';
import MovieContainer from './components/MovieContainer/MovieContainer';
import MoviePage from './components/MoviePage/MoviePage';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movieDetails : {},
      genres: [],
      typing: false,
      key: 'b980b84d',
      allMoviesData: [],
      toWatchedData: [],
      watchedData : [],
      filteredData : [],
      imdbID : '',
      showPage: false,
      data: {
        'Search' : []
      },
    };
  }
  

  componentDidMount() {
    
    this.getDataFromFirebase();
    const urlNeeded = window.location.pathname.slice(1);

    if( window.location.pathname !== '/' ) {
      this.showMovie(urlNeeded) 
    }
  }


getDataFromFirebase = () => {
  fetch('https://movieappdatacubesfp.firebaseio.com/movies.json')  
  .then(response => response.json())
  .then(responseData => {

    const toWatchedData = this.formatData( responseData ).filter(( movie ) => {
      return movie.status.includes('toWatched')
    })

    const watchedData = this.formatData( responseData ).filter(( movie ) => {
      return movie.status.includes('watched')
    })

    this.setState({
      toWatchedData : toWatchedData,
      filteredData : toWatchedData,
      watchedData : watchedData,
      allMoviesData : this.formatData( responseData )
    })
  })
}


formatData(responseData) {
  const data = [];
  
  for(const item in responseData) {
      data.push({
          ...responseData[item],
          fireBaseId: item,
      })
  }
  return data;
}


search = ( e ) => {
  let word = e.target.value;

  if(word) {
    this.setState({
      typing : true
    });
    this.searchFetch(word);
    
  } else {
    
    this.setState({
      typing : false,
      // data : this.state.defaultData
    })
  }
} 


searchFetch = ( word ) => {
  fetch(`http://www.omdbapi.com/?s=${ word }&apikey=${ this.state.key }&type=movie`)
  .then(response => response.json())
  .then(responseData => {
    
    if(responseData['Response'] === 'True') {
      this.setState({
        data : responseData
      })
    } else {
      this.setState({
        // data : this.state.defaultData
        
      })
    } 
  })
}


select = ( item ) => {
  let itemId = item.imdbID;

  fetch(`http://www.omdbapi.com/?i=${ itemId }&apikey=${ this.state.key }&type=movie`)
  .then(response => response.json())
  .then(movieData => {

    const movieId = movieData.imdbID;

    const moviesToWatchData = this.state.allMoviesData.every(( movie ) => {
      return  movie.imdbID !== movieId
    })

    if ( moviesToWatchData ) {
      movieData.status = 'toWatched';
      this.getMovieData( movieData );
      this.getDataFromFirebase();
      this.setState({
        typing : false,
      })
    } else {
      this.getDataFromFirebase();
    }
  })
}


getMovieData = ( data ) => {
  
  fetch('https://movieappdatacubesfp.firebaseio.com/movies.json', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}


deleteMovie = ( item ) => {
 
  let itemId = item.fireBaseId;
  
  fetch(`https://movieappdatacubesfp.firebaseio.com/movies/${ itemId }.json`, {
    method: 'DELETE',
  }).then(() => this.getDataFromFirebase())

  this.filterData()
}


addToWachedMovie = ( item ) => {
  let itemId = item.fireBaseId;
  
  fetch(`https://movieappdatacubesfp.firebaseio.com/movies/${ itemId }.json`, {
    method: 'PATCH',
    body: JSON.stringify({
      status : 'watched'
    })
  })
  .then(() => this.getDataFromFirebase())
  this.filterData()
}


handleOutsideClick = (e) => {
  e.nativeEvent.stopImmediatePropagation();
}


filterData() {
  let genres=this.state.toWatchedData.map((movie) => {
    return movie.Genre.split(',')
  })

  const genresArr = [];

  for(let i =0; i < genres.length; i++){
    for( let j = 0; j < genres[i].length; j++){

      const genreMatch = genresArr.every(( movie ) => {
        return  movie !== genres[i][j]
      })
        
      if(genreMatch){
        genresArr[genresArr.length] = genres[i][j];
      }
    }
  }
  this.setState({
    genres : genresArr
  })
}


resetFilter = () => {
  this.setState({
    filteredData : this.state.toWatchedData
  })
}


filterGenres = ( zanr ) => {
  
  let data = this.state.toWatchedData;

  const filtriraniPodaci = data.filter((film) => {
    return film.Genre.includes(zanr)
  })

  this.setState({
    filteredData : filtriraniPodaci
  })
}


upOrDown = ( movie, witchWay ) => {
  let data = this.state.filteredData;
  let fromIndex = data.indexOf(movie);
  let toIndex;

  witchWay ? toIndex = fromIndex + 1 : toIndex = fromIndex -1

  let newData = this.move(data, fromIndex, toIndex )

  this.setState({
    filteredData : newData
  })

}


move(array, from, to) {
  if( to < 0 || to === array.length ) return array;

  var target = array[from];                         
  var increment = to < from ? -1 : 1;

  for(var k = from; k !== to; k += increment){
    array[k] = array[k + increment];
  }
  array[to] = target;
  return array;
}

showMovie = ( id ) => {
  
    fetch(`http://www.omdbapi.com/?i=${ id }&apikey=${ this.state.key }&type=movie`)
    .then(response => response.json())
    .then(movieData => {
      
        this.setState({
          movieDetails : movieData,
          imdbID : id,
          showPage : true
        })
    })
  }


  render() {
    const { data, filteredData, typing, watchedData, genres,imdbID ,movieDetails, showPage} = this.state;
    
    return (
        <BrowserRouter>
          <div className='app'>
            <Route exact path='/'>
              <Header
                data={ data }
                select={ this.select }          
                search={ ( e ) => this.search( e ) }
                typing={ typing }
                handleOutsideClick={(e) => this.handleOutsideClick(e) }
              />
              <MovieContainer
                filter={ true }
                otherControls={ true }
                movieData={ filteredData }
                genres={ genres }
                title={'To watched'}
                filterData={ () => this.filterData() }
                filterGenres={ this.filterGenres } 
                showMovie={ this.showMovie }
                resetFilter={ this.resetFilter }
                deleteMovie={ ( e ) => this.deleteMovie( e ) }
                addToWachedMovie={ ( e ) => this.addToWachedMovie( e ) }
                upOrDown={ ( e, k ) => this.upOrDown( e, k ) }
              />
              <MovieContainer
                filter={ false }
                otherControls={ false }
                showMovie={ this.showMovie}
                movieData={ watchedData }
                title={'Watched'}
                deleteMovie={ ( e ) => this.deleteMovie( e ) }
              />
            </Route>
            <Route path={`/${imdbID}`}>
              { showPage &&
                <MoviePage
                  movieDetails={ movieDetails }
                />
              }
            </Route>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
