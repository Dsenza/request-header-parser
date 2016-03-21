export const ADD_MOVIE = 'ADD_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';

export const SEARCH_FILTER = 'SEARCH_FILTER';



export function addMovie(movie) {
  return { type: ADD_MOVIE, movie }
}

export function deleteMovie(index) {
  return { type: DELETE_MOVIE, index }
}

export function searchFilter(text) {
  return { type: SEARCH_FILTER, text }
}

/*
{
  filterText: 'text',
  movies: [
    {title: 'text', genre: 'genre', ['actor1', 'actor2'], index: 'int'},
    {title: 'text', genre: 'genre', ['actor1', 'actor2'], index: 'int'},
    {title: 'text', genre: 'genre', ['actor1', 'actor2'], index: 'int'}
  ]
}
*/