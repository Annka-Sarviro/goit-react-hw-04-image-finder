import React, { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import style from './app.module.css';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);

  const resetGallery = () => {
    setPage(1);
  };

  const formSubmitHandler = value => {
    if (!value) {
      return Notify.warning('Enter saerch value');
    }
    resetGallery();
    setSearchValue(value);
  };

  const buttonHandler = e => {
    e.preventDefault();
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={style.app}>
      <Searchbar onSubmit={formSubmitHandler} />

      <ImageGallery value={searchValue} page={page}>
        <Button onClick={buttonHandler}>Load more</Button>
      </ImageGallery>
    </div>
  );
}
