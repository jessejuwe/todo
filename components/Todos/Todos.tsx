import React, { useState, useContext } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { motion, AnimatePresence } from 'framer-motion';

import { TodoContext } from '../../context/todo-context';
import TodoUpdateForm from '../TodoUpdateForm/TodoUpdateForm';

interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
}

type Props = {};

const Todos: React.FC<Props> = props => {
  const ctx = useContext(TodoContext);

  const updateForm = <TodoUpdateForm />;

  const editTodo = (value: Todo) => {
    ctx?.setClicked(true);

    const updatedTodo = ctx?.todos.filter(todo => todo.id === value.id);
    console.log(updatedTodo);
  };

  const completeTodo = (todo: string) => ctx?.completeTodo(todo);
  const removeTodo = (todo: string) => ctx?.removeTodo(todo);

  return (
    <div>
      <AnimatePresence>
        {ctx?.todos.map((todo, index) => {
          return (
            <motion.div
              key={index}
              whileInView={{ x: [-100, 0], opacity: [0, 1] }}
              exit={{ x: [0, 20], opacity: [1, 0] }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                delayChildren: 0.5,
              }}
              className={`${
                todo.isComplete ? 'todo-row complete' : 'todo-row'
              } app__flex`}
            >
              {ctx.isClicked ? (
                updateForm
              ) : (
                <div key={todo.id} className="todos-item">
                  <div
                    key={todo.id}
                    onClick={() => completeTodo(todo.id)}
                    className="app__todo-list-item"
                  >
                    {todo.text}
                  </div>

                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{
                      duration: 2,
                      ease: 'easeInOut',
                      delayChildren: 0.5,
                    }}
                    className="icons app__flex"
                  >
                    <RiCloseCircleLine
                      className="delete-icon"
                      onClick={() => removeTodo(todo.id)}
                    />
                    <TiEdit
                      className="edit-icon"
                      onClick={() => editTodo(todo)}
                    />
                  </motion.div>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Todos;