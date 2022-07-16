import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <ThreeDots height="100" width="100" color="grey" ariaLabel="loading" />
  );
};

export default Loader;
