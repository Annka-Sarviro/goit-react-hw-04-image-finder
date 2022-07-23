import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { Formik, Form, Field } from 'formik';
import style from './searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = value => {
    onSubmit(value.name);
  };

  return (
    <div className={style.searchbar}>
      <Formik initialValues={{ name: '' }} onSubmit={handleSubmit}>
        <Form className={style.form}>
          <button type="submit" className={style.button}>
            <BiSearch size="32" />
            <span className={style.button_label}>Search</span>
          </button>
          <label>
            <Field
              className={style.input}
              type="text"
              name="name"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </label>
        </Form>
      </Formik>
    </div>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
