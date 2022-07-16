import React from 'react';
import style from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({ value, clickModalOpen }) => {
  return (
    <div>
      <li
        className={style.gallery_item}
        key={value.id}
        onClick={clickModalOpen}
        value={value}
      >
        <img
          src={value.webformatURL}
          alt={value.tags}
          className={style.image}
        />
      </li>
    </div>
  );
};
