import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button/Button';

import style from './app.module.css';

export class App extends Component {
  state = { searchValue: '', page: 1 };

  formSubmitHandler = value => {
    this.setState({ searchValue: value, page: 1, hits: [] });
  };

  buttonHandler = e => {
    e.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <div className={style.app}>
        <Searchbar onSubmit={this.formSubmitHandler} />

        <ImageGallery
          value={this.state.searchValue.name}
          page={this.state.page}
        >
          <Button onClick={this.buttonHandler}>Load more</Button>
        </ImageGallery>
      </div>
    );
  }
}
