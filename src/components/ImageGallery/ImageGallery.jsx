import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Loader from '../Loader';
import Button from 'components/Button/Button';
import api from '../../services/image-api';
import style from './imageGallery.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ImageGallery extends Component {
  state = {
    page: 1,
    hits: [],
    isLoading: false,
    isModalOpen: false,
    data: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const value = this.props.value;
    const page = this.state.page;

    if (prevProps.value !== this.props.value) {
      this.setState({ page: 1, hits: [] });
    }
    if (
      prevProps.value !== this.props.value ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });
        if (!value) {
          this.setState({ isLoading: false });
          return Notify.warning('Enter saerch value');
        }
        const galleryValues = await api.fetchImage(value, page);
        const hitsValue = galleryValues.hits;
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

  buttonHandler = e => {
    e.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const values = this.state.hits;

    return (
      <div>
        {this.state.isLoading && <Loader />}
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
        {this.state.hits.length > 0 && (
          <Button onClick={this.buttonHandler}>Load more</Button>
        )}

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
