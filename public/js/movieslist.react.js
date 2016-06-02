// Search looks for an exact match of what is typed in ignoring case.
// Movie adds work, entry into actors box is not particularly robust.
// Splits the entries into an array by searching for commas.


// Initialize local storage of movie collection is none is found
if(!localStorage.getItem('movies')) {
  localStorage.setItem('movies', '[]')
}

var MOVIES = JSON.parse(localStorage.getItem('movies'))

var helperFunc = {
  textSearch: function(searchText, searchTarget) {
    var reg = new RegExp(searchText, "i");
    return searchTarget.match(reg);
  },

  actorsArrFormat: function(actorStr) {
    return actorStr.split(", ");
  }
};

var MovieRow = React.createClass({
  handleDelete: function() {
    this.props.deleteMovie(this.props.index);
  },
  
  render: function() {
    var actors = this.props.movie.actors.map(function(actor, index, arr) {
      if(index == arr.length - 1) {
        return actor;
      }
      return actor + ", ";
    }).join('');
    return (
      <tr className="movieRow">
        <td>{this.props.movie.title}</td>
        <td>{this.props.movie.genre}</td>
        <td>{actors}</td>
        <td className="trash"><i className="material-icons" onClick={this.handleDelete}>delete</i></td>
      </tr>
    );
  }
});

var MovieTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.movies.forEach(function(movie, index) {
      if (!helperFunc.textSearch(this.props.searchText, movie.title + " " + movie.genre + " " + movie.actors.join(" "))) {
        return;
      }
      rows.push(<MovieRow movie={movie} key={index} index={index} deleteMovie={this.props.deleteMovie} /> );
    }.bind(this));
        
    return (
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Actors</th>
            <th></th>
          </tr>
          {rows}
        </tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.searchTextInput.value
    );
  },

  render: function() {
    return (
      <form className="searchForm">
        <input
          type="text"
          placeholder="Search your movies..."
          value={this.props.searchText}
          ref="searchTextInput"
          onChange={this.handleChange} />
      </form>
    );
  }
});

var AddMovieForm = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.addTitleInput.value,
      this.refs.addGenreInput.value,
      this.refs.addActorsInput.value
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.addTitleInput.value.trim();
    var genre = this.refs.addGenreInput.value.trim();
    var actors = this.refs.addActorsInput.value.trim();
    if(!title || !genre || !actors) {
      return;
    }
    var actorsArr = helperFunc.actorsArrFormat(actors);
    var movie = {title: title, genre: genre, actors: actorsArr}
    //Send to server
    this.props.onMovieSubmit(movie);
  },

  render: function() {
    return (
      <form className="addMovieForm" onSubmit={this.handleSubmit}>
        <input className="addMovieTextBox" type="text" placeholder="Title" value={this.props.addTitle}
          ref="addTitleInput" onChange={this.handleChange} />
        <input className="addMovieTextBox" type="text" placeholder="Genre" value={this.props.addGenre}
          ref="addGenreInput" onChange={this.handleChange} />
        <input className="addMovieTextBox" type="text" placeholder="Actors (comma seperated)" value={this.props.addActors}
          ref="addActorsInput" onChange={this.handleChange} />
        <input className="addMovieTextBox" type="submit" value="Add movie" />
      </form>
    );
  }
});

var FilterableMoviesTable = React.createClass({
  loadMoviesFromStorage: function() {
    this.setState({movies: MOVIES})
  },
  
  getInitialState: function() {
    return {
      searchText: '',
      addTitle: '',
      addGenre: '',
      addActors: '',
      movies: []
    };
  },

  componentDidMount: function() {
    this.loadMoviesFromStorage();
  },
  
  // Modifies state related to search bar
  handleSearchInput: function(searchText) {
    this.setState({
      searchText: searchText
    });
  },
  
  //Modifies state related to movie addition bar
  handleAddMovieInput: function(addTitle, addGenre, addActors) {
    this.setState({
      addTitle: addTitle,
      addGenre: addGenre,
      addActors: addActors
    });
  },

  handleMovieSubmit: function(movie) {
    MOVIES.push(movie);
    this.setState({
      movies: MOVIES,
      addTitle: '',
      addGenre: '',
      addActors: ''
    });
    localStorage.setItem('movies', JSON.stringify(MOVIES))
  },
  
  handleMovieDelete: function(index) {
    MOVIES.splice(index, 1);
    this.setState({
      movies: MOVIES
    });
    localStorage.setItem('movies', JSON.stringify(MOVIES))
  },

  render: function() {
    return (
      <div>
        <SearchBar
          searchText={this.state.searchText}
          onUserInput={this.handleSearchInput} />
        
        <MovieTable
          searchText={this.state.searchText}
          deleteMovie={this.handleMovieDelete}
          movies={this.state.movies} />
        
        <AddMovieForm
          onUserInput={this.handleAddMovieInput}
          addTitle={this.state.addTitle} addGenre={this.state.addGenre}
          addActors={this.state.addActors} onMovieSubmit={this.handleMovieSubmit} />
      </div>
    );
  }
});

ReactDOM.render(<FilterableMoviesTable />, document.getElementById('content'));