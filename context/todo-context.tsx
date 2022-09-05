import React, { useState, useEffect } from 'react';
import Todo from '../models/todo';

interface TodoContextObj {
  todos: Todo[];
  editTodo: (id: string) => void;
  addTodo: (todo: string) => void;
  removeTodo: (id: string) => void;
  completeTodo: (id: string) => void;
  updateTodo: (id: string, value: string) => void;
  deleteTodos: (key: string) => void;
}

export const TodoContext = React.createContext<TodoContextObj | null>({
  todos: [],
  editTodo: (id: string) => {},
  addTodo: (todo: string) => {},
  removeTodo: (id: string) => {},
  completeTodo: (id: string) => {},
  updateTodo: (id: string, value: string) => {},
  deleteTodos: (key: string) => {},
});

type Props = { children: React.ReactNode };

const ContextProvider: React.FC<Props> = props => {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (!data) return;
    const todos: Todo[] = JSON.parse(data);
    setTodos(todos);

    return () => {};
  }, []);

  const modifyLocalStorage = (key: string, value: Todo[]) => {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const addTodo = (todo: string) => {
    // Guard Clause
    if (!todo || /^\s*$/.test(todo)) return;

    const newTodo = [...todos, new Todo(todo)];
    setTodos(newTodo);

    localStorage.setItem('todos', JSON.stringify(newTodo));
  };

  const editTodo = (id: string) => {
    let updatedTodo = todos.map(todo => {
      if (todo.id === id) todo.isActive = !todo.isActive;
      return todo;
    });

    setTodos(updatedTodo);
  };

  const updateTodo = (id: string, value: string) => {
    // Guard Clause
    if (!value || /^\s*$/.test(value)) return;

    let updatedTodo = todos.map(todo => {
      if (todo.id === id) {
        todo.text = value;
        todo.isActive = !todo.isActive;
      }
      return todo;
    });

    setTodos(updatedTodo);

    modifyLocalStorage('todos', todos);
  };

  const removeTodo = (id: string) => {
    const updatedTodo = [...todos].filter(todo => todo.id !== id);

    setTodos(updatedTodo);
    modifyLocalStorage('todos', updatedTodo);
  };

  const completeTodo = (id: string) => {
    let updatedTodo = todos.map(todo => {
      if (todo.id === id) todo.isComplete = !todo.isComplete;
      return todo;
    });

    setTodos(updatedTodo);
    modifyLocalStorage('todos', updatedTodo);
  };

  const deleteTodos = (key: string) => {
    setTodos([]);
    localStorage.removeItem(key);
  };

  const contextValue: TodoContextObj = {
    todos,
    editTodo,
    addTodo,
    removeTodo,
    completeTodo,
    updateTodo,
    deleteTodos,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default ContextProvider;
