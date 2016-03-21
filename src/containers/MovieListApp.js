import React from 'react';

import MovieSearchBar from '../components/MovieSearchBar';
import MovieTableContainer from './MovieTableContainer';
import MovieAddForm from '../components/MovieAddForm';

class MovieListApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      addMovieTitle: '',
      addMovieGenre: '',
      addMovieActors: '',
      movies: JSON.parse(localStorage.getItem('movies')) || []
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleAddMovieInput = this.handleAddMovieInput.bind(this);
    this.handleMovieSubmit = this.handleMovieSubmit.bind(this);
    this.handleMovieDelete = this.handleMovieDelete.bind(this);
  }

  saveState() {
    localStorage.setItem('movies', JSON.stringify(this.state.movies));
  }

  // Modifies state related to search bar
  handleSearchInput(searchText) {
    this.setState({
      searchText: searchText
    });
  }

  //Modifies state related to movie addition bar
  handleAddMovieInput(addMovieTitle, addMovieGenre, addMovieActors) {
    this.setState({
      addMovieTitle: addMovieTitle,
      addMovieGenre: addMovieGenre,
      addMovieActors: addMovieActors
    });
  }


  handleMovieSubmit() {
    var title = this.state.addMovieTitle.trim();
    var genre = this.state.addMovieGenre.trim();
    var actors = this.state.addMovieActors.trim();
    if(!title || !genre || !actors) {
      return;
    }
    var actorsArr = actors.split(', ');
    var movie = {title: title, genre: genre, actors: actorsArr}

    this.setState({
      movies: [...this.state.movies, movie],
      addMovieTitle: '',
      addMovieGenre: '',
      addMovieActors: ''
    });
  }

  handleMovieDelete(index) {
    this.setState({
      movies: this.state.movies.splice(index, 1)
    });
    localStorage.movies = JSON.stringify(this.state.movies);
  }
  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <MovieSearchBar
          searchText={this.state.searchText}
          onSearchInput={this.handleSearchInput} />

        <MovieTableContainer
          searchText={this.state.searchText}
          onDeleteMovie={this.handleMovieDelete}
          movies={this.state.movies} />

        <MovieAddForm
          onUserInput={this.handleAddMovieInput}
          addMovieTitle={this.state.addMovieTitle} addMovieGenre={this.state.addMovieGenre}
          addMovieActors={this.state.addMovieActors} onMovieSubmit={this.handleMovieSubmit} />
      </div>
    );
  }
}

export default MovieListApp;