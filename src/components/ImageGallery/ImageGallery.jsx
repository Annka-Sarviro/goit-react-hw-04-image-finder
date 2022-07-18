import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Loader from '../Loader';

import api from '../../services/image-api';
import style from './imageGallery.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ImageGallery extends Component {
  state = {
    hits: [],
    isLoading: false,
    isModalOpen: false,
    data: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const value = this.props.value;
    const page = this.props.page;
    if (prevProps.value !== value) {
      this.setState({ hits: [] });
    }
    if (!value) {
      this.setState({ isLoading: false });
      return Notify.warning('Enter saerch value');
    }
    if (prevProps.value !== value || prevProps.page !== page) {
      try {
        this.setState({ isLoading: true });

        const galleryValues = await api.fetchImage(value, page);

        const hitsValue = await galleryValues.hits;
        this.setState(state => ({
          hits: [...state.hits, ...hitsValue],
          isLoading: false,
        }));
      } catch (error) {
        this.setState({ error: true, isLoading: false });
        console.log(error);
      }
    }
  }

  clickModalHandler = data => {
    this.setState({ isModalOpen: true, data: data });
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const values = this.state.hits;

    return (
      <div>
        <ul className={style.gallery}>
          {values.map(value => {
            return (
              <div key={value.id}>
                <ImageGalleryItem
                  value={value}
                  clickModalOpen={() => this.clickModalHandler(value)}
                />
              </div>
            );
          })}
        </ul>
        {this.state.isLoading && <Loader />}
        {this.state.hits.length > 0 &&
          this.state.isLoading &&
          this.props.children}

        {this.state.isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <img
              src={this.state.data.largeImageURL}
              alt={this.state.data.tags}
              onClick={this.toggleModal}
            />
          </Modal>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string,
};
