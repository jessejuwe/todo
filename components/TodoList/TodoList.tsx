import React from 'react';
import { motion } from 'framer-motion';

import Todos from '../Todos/Todos';
import TodoForm from '../TodoForm/TodoForm';

type Props = {};

const TodoList: React.FC<Props> = props => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
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
