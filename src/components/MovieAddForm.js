import React from 'react';

class MovieAddForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    this.props.onUserInput(
      this.refs.addTitleInput.value,
      this.refs.addGenreInput.value,
      this.refs.addActorsInput.value
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onMovieSubmit();
  }

  render() {
    return (
      <form className="addMovieForm" onSubmit={this.handleSubmit}>
        <input className="addMovieTextBox" type="text" placeholder="Title" value={this.props.addMovieTitle}
          ref="addTitleInput" onChange={this.handleChange} />
        <input className="addMovieTextBox" type="text" placeholder="Genre" value={this.props.addMovieGenre}
          ref="addGenreInput" onChange={this.handleChange} />
        <input className="addMovieTextBox" type="text" placeholder="Actors (comma seperated)" value={this.props.addMovieActors}
          ref="addActorsInput" onChange={this.handleChange} />
        <input className="addMovieTextBox" type="submit" value="Add movie" />
      </form>
    );
  }
}

export default MovieAddForm;