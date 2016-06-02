import React from 'react';

class MovieRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDeleteMovie(this.props.index);
  }

  render() {
    var actors = this.props.movie.actors.map(function(actor, index, arr) {
      return (index == arr.length - 1) ? actor : actor + ", ";
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
}

export default MovieRow;