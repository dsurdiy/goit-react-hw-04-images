import { Component } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = values => {
    this.setState({ searchQuery: values.searchQuery });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className={css.container}>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery query={searchQuery} />

        <ToastContainer />
      </div>
    );
  }
}
