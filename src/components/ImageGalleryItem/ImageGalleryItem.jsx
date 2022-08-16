import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = e => {
    if (e.target.nodeName === 'IMG') {
      setShowModal(true);
    }
  };

  return (
    <>
      <li className={css.gallery_item} onClick={handleItemClick}>
        <img src={webformatURL} alt={id} />
      </li>

      {showModal && (
        <Modal src={largeImageURL} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
