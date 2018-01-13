
import {
  addTodo,
  changeText, deleteTodo,
  requestTodos, todosSuccess,
} from '../actions';
import {
  ADD_TODO,
  CHANGE_TEXT, DELETE_TODO,
  REQUEST_TODOS, TODOS_SUCCESS,
} from '../constants';

describe('Todos actions', () => {
  describe('Request todos Action', () => {
    it('has a type of REQUEST_TODOS', () => {
      const expected = {
        type: REQUEST_TODOS,
      };
      expect(requestTodos()).toEqual(expected);
    });
  });
  describe('Change text Action', () => {
    it('has a type of CHANGE_TEXT', () => {
      const exampleText = 'Hello World';
      const expected = {
        type: CHANGE_TEXT,
        payload: exampleText,
      };
      expect(changeText(exampleText)).toEqual(expected);
    });
  });
  describe('Todo Success', () => {
    it('has a type of TODOS_SUCCESS', () => {
      const expected = {
        type: TODOS_SUCCESS,
        payload: [
          {
            text: 'get milk',
            completed: true,
            createdAt: '2018-01-12T21:10:30.965Z',
            updatedAt: '2018-01-12T21:11:06.089Z',
            id: 23,
          },
        ],
      };
      expect(todosSuccess([
        {
          text: 'get milk',
          completed: true,
          createdAt: '2018-01-12T21:10:30.965Z',
          updatedAt: '2018-01-12T21:11:06.089Z',
          id: 23,
        },
      ])).toEqual(expected);
    });
  });
  describe('Request todos Action', () => {
    it('has a type of ADD_TODO', () => {
      const expected = {
        type: ADD_TODO,
        payload: 'foo',
      };
      expect(addTodo('foo')).toEqual(expected);
    });
  });
  describe('Delete todos Action', () => {
    it('has a type of DELETE_TODO', () => {
      const expected = {
        type: DELETE_TODO,
        payload: 1,
      };
      expect(deleteTodo(1)).toEqual(expected);
    });
  });
});
