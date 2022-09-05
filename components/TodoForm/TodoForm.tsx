import React, { useContext, Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { TodoContext } from '../../context/todo-context';

interface MyFormValues {
  text: string;
}

type Props = {};

const TodoForm: React.FC<Props> = props => {
  const ctx = useContext(TodoContext);

  const initialValues: MyFormValues = { text: '' };

  const deleteTodos = () => ctx?.deleteTodos('todos');
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
          ctx?.addTodo(values.text);

          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form className="app__form app__flex">
            <div className="app__form-todo app__flex">
              <Field
                type="text"
                name="text"
                placeholder="Add a Todo"
                className="app__form-todo-input"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
              />
              <ErrorMessage name="todo" component="div" className="error" />
            </div>

            <div className="app__form-todo-button app__flex">
              <button type="submit" disabled={isSubmitting}>
                Add Todo
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={deleteTodos}
              >
                Delete Todos
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default TodoForm;
