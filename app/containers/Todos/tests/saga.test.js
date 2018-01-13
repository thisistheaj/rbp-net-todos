/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
// import { defaultSaga } from '../saga';

// const generator = defaultSaga();

import defaultSaga, { deleteTodoSaga, getTodos, sendTodo } from '../saga';
import { addTodoSuccess, requestTodos, todosSuccess } from '../actions';
import { ADD_TODO, DELETE_TODO, REQUEST_TODOS } from '../constants';

describe('getTodos Saga', () => {
  let getTodosSagaGenerator;
  beforeEach(() => {
    getTodosSagaGenerator = getTodos();
    const callDescriptor = getTodosSagaGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });
  it('Expect to dispatch success when it gets todos', () => {
    const todos = [{
      text: 'get milk',
      completed: true,
      createdAt: '2018-01-12T21:10:30.965Z',
      updatedAt: '2018-01-12T21:11:06.089Z',
      id: 23,
    }];
    const putDescriptor = getTodosSagaGenerator.next(todos).value;
    expect(putDescriptor).toEqual(put(todosSuccess(todos)));
  });
});

describe('sendTodo Saga', () => {
  let sendTodoSagaGenerator;
  beforeEach(() => {
    sendTodoSagaGenerator = sendTodo();
    const selectDescriptor = sendTodoSagaGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
    const callDescriptor = sendTodoSagaGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });
  it('Expect to dispatch success when it adds todo', () => {
    const putDescriptor = sendTodoSagaGenerator.next().value;
    expect(putDescriptor).toEqual(put(requestTodos()));
  });
  it('Expect to dispatch success when it adds todo', () => {
    let putDescriptor = sendTodoSagaGenerator.next().value;
    putDescriptor = sendTodoSagaGenerator.next().value;
    expect(putDescriptor).toEqual(put(addTodoSuccess()));
  });
});

describe('deleteTodoSaga', () => {
  let deleteTodoSagaGenerator;
  beforeEach(() => {
    deleteTodoSagaGenerator = deleteTodoSaga({ payload: 1 });
    const callDescriptor = deleteTodoSagaGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });
  it('refreshes todos on success', () => {
    const putDescriptor = deleteTodoSagaGenerator.next().value;
    expect(putDescriptor).toEqual(put(requestTodos()));
  });
});

describe('defaultSaga Saga', () => {
  let defaultSagaGenerator;
  beforeEach(() => {
    defaultSagaGenerator = defaultSaga();
  });
  it('runs getTodos Saga on latest', () => {
    const takeLatestDescriptor = defaultSagaGenerator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(REQUEST_TODOS, getTodos));
  });
  it('runs sendTodo Saga on add', () => {
    let takeLatestDescriptor = defaultSagaGenerator.next().value;
    takeLatestDescriptor = defaultSagaGenerator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(ADD_TODO, sendTodo));
  });
  it('runs deleteTodo Saga on add', () => {
    let takeLatestDescriptor = defaultSagaGenerator.next().value;
    takeLatestDescriptor = defaultSagaGenerator.next().value;
    takeLatestDescriptor = defaultSagaGenerator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(DELETE_TODO, deleteTodoSaga));
  });
});
