import React from 'react';

class MovieSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange() {
    this.props.onSearchInput(
      this.refs.searchTextInput.value
    );
  }

  render() {
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
}

export default MovieSearchBar