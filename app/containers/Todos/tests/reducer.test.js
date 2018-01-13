
import { fromJS } from 'immutable';
import todosReducer from '../reducer';
import { changeText, requestTodos, todosFailure, todosSuccess } from '../actions';
import { ADD_TODO, ADD_TODO_SUCCESS, DELETE_TODO } from '../constants';

describe('todosReducer', () => {
  it('returns the initial state', () => {
    expect(todosReducer(undefined, {})).toEqual(fromJS({
      loading: false,
      success: false,
      error: false,
      todos: [],
      todoField: '',
    }));
  });
  it('handle loading todos', () => {
    expect(todosReducer(fromJS({
      loading: false,
      success: false,
      error: false,
      todos: [],
      todoField: '',
    }), requestTodos())).toEqual(fromJS({
      loading: true,
      success: false,
      error: false,
      todos: [],
      todoField: '',
    }));
  });
  it('sets todos upon success', () => {
    expect(todosReducer(fromJS({
      loading: true,
      success: false,
      error: false,
      todos: [],
      todoField: '',
    }), todosSuccess([
      {
        text: 'get milk',
        completed: true,
        createdAt: '2018-01-12T21:10:30.965Z',
        updatedAt: '2018-01-12T21:11:06.089Z',
        id: 23,
      },
    ]))).toEqual(fromJS({
      loading: false,
      success: true,
      error: false,
      todos: [{
        text: 'get milk',
        completed: true,
        createdAt: '2018-01-12T21:10:30.965Z',
        updatedAt: '2018-01-12T21:11:06.089Z',
        id: 23,
      }],
      todoField: '',
    }));
  });
  it('handles todos error correctlty', () => {
    const someError = {
      message: 'failed to fetch todos',
    };
    expect(todosReducer(fromJS({
      loading: true,
      success: false,
      error: false,
      todos: [],
      todoField: '',
    }), todosFailure(someError))).toEqual(fromJS({
      loading: false,
      success: false,
      error: someError,
      todos: [],
      todoField: '',
    }));
  });
  it('handles changes to todoField correctlty', () => {
    expect(todosReducer(fromJS({
      loading: false,
      success: false,
      error: false,
      todos: [],
      todoField: '',
    }), changeText('foo'))).toEqual(fromJS({
      loading: false,
      success: false,
      error: false,
      todos: [],
      todoField: 'foo',
    }));
  });
  it('handles ADD_TODO successfully', () => {
    expect(todosReducer(fromJS({
      loading: false,
      success: true,
      error: { message: 'Some Error' },
    }), { type: ADD_TODO })).toEqual(fromJS({
      loading: true,
      success: false,
      error: false,
    }));
  });
  it('handles ADD_TODO_SUCCESS successfully', () => {
    expect(todosReducer(fromJS({
      loading: true,
      success: false,
      error: false,
      todoField: 'Some Todo',
    }), { type: ADD_TODO_SUCCESS })).toEqual(fromJS({
      loading: false,
      success: true,
      error: false,
      todoField: '',
    }));
  });
  it('handles DELETE_TODO successfully', () => {
    expect(todosReducer(fromJS({
      loading: false,
      success: true,
      error: { message: 'Some Error' },
    }), { type: DELETE_TODO })).toEqual(fromJS({
      loading: true,
      success: false,
      error: false,
    }));
  });
});
