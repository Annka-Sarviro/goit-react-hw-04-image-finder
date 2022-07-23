import React, { useState, useEffect } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import * as Scroll from 'react-scroll';

import Modal from '../Modal';
import Loader from '../Loader';

import api from '../../services/image-api';
import style from './imageGallery.module.css';

export default function ImageGallery({ value, page, children }) {
  const [hits, setHits] = useState([]);
  const [jpgData, setIpgData] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setHits([]);
  }, [value]);

  useEffect(() => {
    if (!value) {
      return;
    }
    async function fethImages() {
      setIsLoader(true);
      try {
        const galleryValues = await api.fetchImage(value, page);
        const hitsValue = await galleryValues.hits;
        setHits(hits => [...hits, ...hitsValue]);
        setIsLoader(false);
      } catch (error) {
        console.log(error);
      } finally {
        const scroll = Scroll.animateScroll;
        scroll.scrollToBottom({
          duration: 1500,
          delay: 100,
          smooth: true,
          offset: 50,
        });
      }
    }
    fethImages();
  }, [page, value]);

  const clickModalHandler = data => {
    setIpgData(data);
    setIsOpen(true);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ul className={style.gallery}>
        {hits.map(hit => {
          return (
            <ImageGalleryItem
              value={hit}
              key={hit.webformatURL}
              clickModalOpen={() => clickModalHandler(hit)}
            />
          );
        })}
      </ul>
      {isLoader && <Loader />}
      {hits.length > 0 && children}
      {isOpen && (
        <Modal onClose={toggleModal}>
          <img
            src={jpgData.largeImageURL}
            alt={jpgData.tags}
            onClick={toggleModal}
          />
        </Modal>
      )}
    </div>
  );
}
ImageGallery.propTypes = {
  value: PropTypes.string,
  page: PropTypes.number,
};
