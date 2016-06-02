import React from 'react';

import MovieTable from '../components/MovieTable';
import MovieRow from '../components/MovieRow';

class MovieTableContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  textSearch(searchText, searchTarget) {
    var reg = new RegExp(searchText, "i");
    return searchTarget.match(reg);
  }

  render() {
    var rows = [];
    this.props.movies.forEach((movie, index) => {
      if (!this.textSearch(this.props.searchText, movie.title + " " + movie.genre + " " + movie.actors.join(" "))) {
        return;
      }
      rows.push(<MovieRow movie={movie} key={index} index={index} onDeleteMovie={this.props.onDeleteMovie} /> );
    });

    return (
      <MovieTable>
        {rows}
      </MovieTable>
    );
  }
}

MovieTableContainer.propTypes = {
  movies: React.PropTypes.array.isRequired
}

export default MovieTableContainer;