// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { ADD_TODO, DELETE_TODO, REQUEST_TODOS } from './constants';
import { todosSuccess, requestTodos, addTodoSuccess } from './actions';
import { makeSelectTodoField } from './selectors';

export function* getTodos() {
  const requestURL = 'http://localhost:1337/todos';
  const todos = yield call(request, requestURL);
  yield put(todosSuccess(todos));
}

export function* sendTodo() {
  const todoText = yield select(makeSelectTodoField());
  const requestURL = 'http://localhost:1337/todos';
  yield call(request, requestURL, {
    method: 'POST',
    body: JSON.stringify({
      text: todoText,
      completed: false,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  yield put(requestTodos());
  yield put(addTodoSuccess());
}

export function* deleteTodoSaga(action) {
  const requestURL = `http://localhost:1337/todos/${action.payload}`;
  yield call(request, requestURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  yield put(requestTodos());
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_TODOS, getTodos);
  yield takeLatest(ADD_TODO, sendTodo);
  yield takeLatest(DELETE_TODO, deleteTodoSaga);
}
