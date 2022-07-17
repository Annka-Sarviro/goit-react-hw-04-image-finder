import React from 'react';
import style from './buttom.module.css';
import PropTypes from 'prop-types';

const Button = ({ children, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={style.button}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};
