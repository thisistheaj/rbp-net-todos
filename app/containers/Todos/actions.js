/*
 *
 * Todos actions
 *
 */

import {
  ADD_TODO, ADD_TODO_SUCCESS,
  CHANGE_TEXT, DELETE_TODO,
  REQUEST_TODOS, TODOS_ERROR, TODOS_SUCCESS,
} from './constants';

export function requestTodos() {
  return {
    type: REQUEST_TODOS,
  };
}

export function todosSuccess(todos) {
  return {
    type: TODOS_SUCCESS,
    payload: todos,
  };
}

export function todosFailure(error) {
  return {
    type: TODOS_ERROR,
    payload: error,
  };
}

export function changeText(text) {
  return {
    type: CHANGE_TEXT,
    payload: text,
  };
}

export function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: text,
  };
}

export function addTodoSuccess() {
  return {
    type: ADD_TODO_SUCCESS,
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: id,
  };
}
