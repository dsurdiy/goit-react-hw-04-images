import { useState, useEffect } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import imagesAPI from 'services/images-api';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    imagesAPI
      .getImages(query, page)
      .then(response => {
        const newImages = response.data.hits;

        if (newImages.length === 0) {
          toast.warn('Oops, there are no images :(');
        }

        setImages(prevImages => [...prevImages, ...newImages]);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [query, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} />

      {isLoading ? <Loader /> : null}

      {images.length === 0 ? null : <Button onLoadMore={loadMore} />}

      {error && <h2>Oops... something went wrong :( Try reloading the page</h2>}

      <ToastContainer />
    </div>
  );
};
