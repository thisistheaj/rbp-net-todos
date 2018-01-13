import React from 'react';
import { shallow } from 'enzyme';

import { mapDispatchToProps, Todos } from '../index';
import { addTodo, changeText, deleteTodo, requestTodos } from '../actions';

describe('<Todos />', () => {
  it('Expect to render one component', () => {
    const props = {
      getTodos: () => {},
      todos: [{ id: 0, text: '', completed: true }],
      todoField: '',
      handleTodoField: () => {},
      handleAddTodo: () => {},
    };
    const renderedComponent = shallow(<Todos {...props} />);
    expect(renderedComponent.length).toEqual(1);
  });
  it('Expect to be called', () => {
    const hdt = jest.fn();
    const props = {
      getTodos: () => {},
      todos: [{ id: 0, text: '', completed: true }],
      todoField: '',
      handleTodoField: () => {},
      handleAddTodo: () => {},
      handleDeleteTodo: hdt,
    };
    const wrapper = shallow(<Todos {...props} />);
    const deleteButton = wrapper.find('li button');
    deleteButton.simulate('click');
    expect(hdt).toHaveBeenCalled();
  });
  describe('mapDispatchToProps', () => {
    it('has the right properties', () => {
      expect(mapDispatchToProps().getTodos).toBeDefined();
      expect(mapDispatchToProps().handleAddTodo).toBeDefined();
      expect(mapDispatchToProps().handleTodoField).toBeDefined();
    });
    describe('getTodos', () => {
      it('dispatches REQUEST_TODOS action', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.getTodos();
        expect(dispatch).toHaveBeenCalledWith(requestTodos());
      });
    });
    describe('handleTodoField', () => {
      it('dispatches CHANGE_TEXT action', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const eventMock = { target: { value: '' } };
        result.handleTodoField(eventMock);
        expect(dispatch).toHaveBeenCalledWith(changeText(''));
      });
    });
    describe('handleAddTodo', () => {
      it('dispatches ADD_TODO action', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.handleAddTodo();
        expect(dispatch).toHaveBeenCalledWith(addTodo());
      });
    });
    describe('handleDeleteTodo', () => {
      it('dispatches ADD_TODO action', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.handleDeleteTodo();
        expect(dispatch).toHaveBeenCalledWith(deleteTodo());
      });
    });
  });
});
