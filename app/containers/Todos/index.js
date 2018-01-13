/**
 *
 * Todos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTodos, { makeSelectTodoField } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { addTodo, changeText, deleteTodo, requestTodos } from './actions';

export class Todos extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getTodos();
  }

  render() {
    const { todos, todoField, handleTodoField, handleAddTodo, handleDeleteTodo } = this.props;
    return (
      <div>
        <h2>
          <FormattedMessage {...messages.header} />
        </h2>
        <div>
          <input type="text" value={todoField} onChange={handleTodoField} />
          <button onClick={handleAddTodo}>Add To-Do</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}<button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Todos.propTypes = {
  getTodos: PropTypes.func,
  todos: PropTypes.array,
  todoField: PropTypes.string,
  handleTodoField: PropTypes.func,
  handleAddTodo: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
  todoField: makeSelectTodoField(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getTodos: () => dispatch(requestTodos()),
    handleTodoField: (evt) => dispatch(changeText(evt.target.value)),
    handleAddTodo: () => dispatch(addTodo()),
    handleDeleteTodo: (id) => dispatch(deleteTodo(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'todos', reducer });
const withSaga = injectSaga({ key: 'todos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Todos);
