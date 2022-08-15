import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import ImagesApiService from 'services/images-api';
import { toast } from 'react-toastify';
import css from './ImageGallery.module.css';

const API = new ImagesApiService();

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      try {
        this.setState({ isLoading: true });

        API.searchQuery = this.props.query;
        API.resetPage();

        const images = await API.getImages();

        if (images.length === 0) {
          toast.warn('Oops, there are no images :(');
        }

        this.setState({ images, isLoading: false });
      } catch (error) {
        this.setState({ error: true, isLoading: false });
      }
    }
  }

  loadMoreImages = async () => {
    try {
      this.setState({ isLoading: true });

      const newImages = await API.getImages();

      if (newImages.length === 0) {
        toast.warn('No more images :(');
      }

      this.setState(state => ({
        images: [...state.images, ...newImages],
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error: true, isLoading: false });
    }
  };

  render() {
    const { images, isLoading, error } = this.state;

    return (
      <>
        <ul className={css.gallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              id={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
            />
          ))}
        </ul>

        {isLoading ? <Loader /> : null}

        {error && (
          <h2>Oops... something went wrong :( Try reloading the page</h2>
        )}

        {images.length === 0 ? null : (
          <Button onLoadMore={this.loadMoreImages} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
