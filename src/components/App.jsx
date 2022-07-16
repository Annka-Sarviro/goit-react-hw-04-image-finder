import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import style from './app.module.css';

export class App extends Component {
  state = { searchValue: '' };

  formSubmitHandler = value => {
    this.setState({ searchValue: value });
  };
  render() {
    return (
      <div className={style.app}>
        <Searchbar onSubmit={this.formSubmitHandler} />

        <ImageGallery value={this.state.searchValue.name} />
      </div>
    );
  }
}
