import { combineReducers } from 'redux'

import { ADD_MOVIE, DELETE_MOVIE, SEARCH_FILTER } from '../actions/actions';

const initialState = {
  filterText: '',
  movies: []
}

function searchFilter(state = '', action) {
  switch (action.type) {
    case SEARCH_FILTER:
      return action.text;
    default:
      return state;
  } 
}

function movies(state = [], action) {
  switch (action.type) {
    case ADD_MOVIE:
      return [
        ...state,
        action.movie
      ];
    case DELETE_MOVIE:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
  }
}

const movieApp = combineReducers({
  searchFilter,
  movies
})

export default movieApp;