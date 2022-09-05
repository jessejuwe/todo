import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Todos from '../Todos/Todos';
import TodoForm from '../TodoForm/TodoForm';

type Props = {};

interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
}

const TodoList = (props: Props) => {
  // const [todos, setTodos] = useState<Array<Todo>>([]);

  // useEffect(() => {
  //   const data = localStorage.getItem('todos');

  //   if (data) setTodos(JSON.parse(data));

  //   return () => {};
  // }, []);

  // const addTodo = (todo: Todo) => {
  //   // Guard Clause
  //   if (!todo.text || /^\s*$/.test(todo.text)) return;

  //   const newTodos = [...todos, todo];

  //   setTodos(newTodos);

  //   localStorage.setItem('todos', JSON.stringify(newTodos));
  // };

  // const updateTodo = (id: string, value: Todo) => {
  //   // Guard Clause
  //   if (!value.text || /^\s*$/.test(value.text)) return;

  //   console.log(todos);

  //   setTodos(prev => prev.map(item => (item.id === id ? value : item)));

  //   console.log(todos);

  //   localStorage.removeItem('todos');
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // };

  // const removeTodo = (id: string) => {
  //   const updatedTodo = [...todos].filter(todo => todo.id !== id);
  //   setTodos(updatedTodo);
  // };

  // const completeTodo = (id: string) => {
  //   let updateTodos = todos.map(todo => {
  //     if (todo.id === id) todo.isComplete = !todo.isComplete;
  //     return todo;
  //   });

  //   setTodos(updateTodos);
  // };

  // const deleteTodos = (key: string) => {
  //   localStorage.removeItem(key);
  //   setTodos([]);
  // };

  return (
    <motion.div
      whileInView={{ y: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 1, ease: 'easeInOut', delayChildren: 0.5 }}
      className="app__todo-list"
    >
      <h1>What&apos;s the plan for today?</h1>
      <TodoForm />
      <Todos />
    </motion.div>
  );
};

export default TodoList;
