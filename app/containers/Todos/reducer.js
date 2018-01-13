/*
 *
 * Todos reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_TODO, CHANGE_TEXT, REQUEST_TODOS, ADD_TODO_SUCCESS, TODOS_ERROR, TODOS_SUCCESS,
  DELETE_TODO,
} from './constants';

const initialState = fromJS({
  loading: false,
  success: false,
  error: false,
  todos: [],
  todoField: '',
});

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TODOS:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case TODOS_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('todos', fromJS(action.payload));
    case TODOS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.payload));
    case CHANGE_TEXT:
      return state.set('todoField', action.payload);
    case ADD_TODO:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case ADD_TODO_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', false)
        .set('todoField', '');
    case DELETE_TODO:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    default:
      return state;
  }
}

export default todosReducer;
