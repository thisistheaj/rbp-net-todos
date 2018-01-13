import { createSelector } from 'reselect';

/**
 * Direct selector to the todos state domain
 */
const selectTodosDomain = (state) => state.get('todos');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Todos
 */

const makeSelectTodos = () => createSelector(
  selectTodosDomain,
  (substate) => substate.get('todos').toJS(),
);

const makeSelectTodoField = () => createSelector(
  selectTodosDomain,
  (substate) => substate.get('todoField'),
);

export default makeSelectTodos;
export {
  selectTodosDomain,
  makeSelectTodoField,
};
