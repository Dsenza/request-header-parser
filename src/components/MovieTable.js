import React from 'react';

import MovieRow from './MovieRow';

const MovieTable = (props) => {

  return (
    <table>
      <tbody>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Actors</th>
          <th></th>
        </tr>
        {props.children}
      </tbody>
    </table>
  )
}

export default MovieTable;