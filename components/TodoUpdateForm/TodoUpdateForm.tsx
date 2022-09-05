import React, { useContext, Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion } from 'framer-motion';

import { TodoContext } from '../../context/todo-context';

interface MyFormValues {
  text: string;
}

type Props = { id: string };

const TodoUpdateForm: React.FC<Props> = props => {
  const ctx = useContext(TodoContext);

  const initialValues: MyFormValues = { text: '' };

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors: any = {};

          if (!values.text) {
            errors.text = 'Required';
          }

          return errors;
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <motion.div className="app__todo-update-form app__flex">
              <div className="app__todo-update-form-todo app__flex">
                <Field
                  type="text"
                  name="text"
                  placeholder="Enter new update"
                  className="app__todo-update-form-todo-input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.text}
                />
                <ErrorMessage name="todo" component="div" className="error" />
              </div>

              <div className="app__todo-update-form-todo-button">
                <button
                  type="submit"
                  onClick={() => ctx?.updateTodo(props.id, values.text)}
                  disabled={isSubmitting}
                >
                  Update Todo
                </button>
              </div>
            </motion.div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default TodoUpdateForm;
