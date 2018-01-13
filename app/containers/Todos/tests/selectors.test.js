import { fromJS } from 'immutable';
// import { selectTodosDomain } from '../selectors';

import makeSelectTodos, { makeSelectTodoField, selectTodosDomain } from '../selectors';

describe('selectTodosDomain', () => {
  let globalState;
  beforeEach(() => {
    globalState = fromJS({
      todos: {
        loading: false,
        success: false,
        error: false,
        todos: [],
        todoField: '',
      },
    });
  });
  it('Expect selectTodosDomain to return initialstate', () => {
    expect(selectTodosDomain(globalState)).toEqual(fromJS({
      loading: false,
      success: false,
      error: false,
      todos: [],
      todoField: '',
    }));
  });
  it('Expect makeSelectTodos to return todos', () => {
    expect(makeSelectTodos()(globalState)).toEqual([]);
  });
  it('Expect makeSelectTodoField to return todos', () => {
    expect(makeSelectTodoField()(globalState)).toEqual('');
  });
});
