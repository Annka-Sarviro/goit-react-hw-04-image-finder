import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './loader.module.css';

import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={style.spinner}>
      <ThreeDots height="100" width="100" color="grey" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
