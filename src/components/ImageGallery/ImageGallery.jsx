import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal';
import Loader from '../Loader';
import api from '../../services/image-api';
import style from './imageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    hits: [],
    isLoading: false,
    isModalOpen: false,
    data: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const image = this.props.value;
    if (this.state.isLoading) {
      this.setState({ hits: [] });
    }
    if (prevProps.value !== this.props.value) {
      try {
        this.setState({ isLoading: true });

        const galleryValues = await api.fetchImage(image);
        this.setState({ hits: galleryValues.hits, isLoading: false });
      } catch {}
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
