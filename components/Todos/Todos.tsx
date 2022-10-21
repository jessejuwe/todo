import React, { useContext } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { motion, AnimatePresence } from 'framer-motion';

import { TodoContext } from '../../context/todo-context';
import TodoUpdateForm from '../TodoUpdateForm/TodoUpdateForm';

type Props = {};

const Todos: React.FC<Props> = props => {
  const ctx = useContext(TodoContext);

  const completeTodo = (todo: string) => ctx?.completeTodo(todo);
  const removeTodo = (todo: string) => ctx?.removeTodo(todo);

  return (
    <div>
      <AnimatePresence>
        {ctx?.todos.map((todo, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -100 }}
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
              {todo.isActive ? (
                <TodoUpdateForm id={todo.id} />
              ) : (
                <div key={index} className="todos-item">
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
                    className="app__todo-icons app__flex"
                  >
                    <RiCloseCircleLine
                      className="delete-icon"
                      onClick={() => removeTodo(todo.id)}
                    />
                    <TiEdit
                      className="edit-icon"
                      onClick={() => ctx.editTodo(todo.id)}
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
