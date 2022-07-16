import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import style from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const FormError = ({ name }) => {
    return <ErrorMessage name={name} render={() => <p>Enter number</p>} />;
  };

  const handleSubmit = async (value, actions) => {
    await onSubmit(value);
    actions.resetForm();
  };

  return (
    <div className={style.searchbar}>
      <Formik initialValues={{ name: '' }} onSubmit={handleSubmit}>
        <Form className={style.form}>
          <button type="submit" className={style.button}>
            <span className={style.button_label}>Search</span>
          </button>

          <Field
            className={style.input}
            type="text"
            name="name"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <FormError name="name" />
        </Form>
      </Formik>
    </div>
  );
};

export default Searchbar;
