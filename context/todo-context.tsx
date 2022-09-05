import React, { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
}

interface TodoContextObj {
  todos: Todo[];
  edit?: { id: string | null; value: string | null };
  isClicked: boolean;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  completeTodo: (id: string) => void;
  updateTodo: (id: string, todo: Todo) => void;
  deleteTodos: (key: string) => void;
  setClicked: (state: boolean) => void;
}

interface InitialState {
  id: string | null;
  value: string | null;
}

export const TodoContext = React.createContext<TodoContextObj | null>({
  todos: [],
  edit: { id: '', value: '' },
  isClicked: false,
  addTodo: (todo: Todo) => {},
  removeTodo: (id: string) => {},
  completeTodo: (id: string) => {},
  updateTodo: (id: string, todo: Todo) => {},
  deleteTodos: (key: string) => {},
  setClicked: (state: boolean) => {},
});

type Props = { children: React.ReactNode };

const initialValue: InitialState = { id: null, value: '' };

const ContextProvider: React.FC<Props> = props => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [edit, setEdit] = useState(initialValue);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('todos');

    if (data) setTodos(JSON.parse(data));

    return () => {};
  }, []);

  const setClicked = (state: boolean) => setIsClicked(state);

  const addTodo = (todo: Todo) => {
    // Guard Clause
    if (!todo.text || /^\s*$/.test(todo.text)) return;

    const newTodos = [...todos, todo];

    setTodos(newTodos);
    setIsClicked(false);

    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const updateTodo = (id: string, value: Todo) => {
    // Guard Clause
    if (!value.text || /^\s*$/.test(value.text)) return;

    if (edit.id) setEdit({ id: value.id, value: value.text });

    localStorage.removeItem('todos');

    setTodos(prev => prev.map(item => (item.id === id ? value : item)));
    setIsClicked(false);

    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const removeTodo = (id: string) => {
    const updatedTodo = [...todos].filter(todo => todo.id !== id);

    localStorage.removeItem('todos');
    setTodos(updatedTodo);
    localStorage.setItem('todos', JSON.stringify(updatedTodo));
  };

  const completeTodo = (id: string) => {
    let updateTodos = todos.map(todo => {
      if (todo.id === id) todo.isComplete = !todo.isComplete;
      return todo;
    });

    setTodos(updateTodos);
  };

  const deleteTodos = (key: string) => {
    localStorage.removeItem(key);
    setTodos([]);
  };

  const contextValue: TodoContextObj = {
    todos,
    isClicked,
    addTodo,
    removeTodo,
    completeTodo,
    updateTodo,
    deleteTodos,
    setClicked,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default ContextProvider;
