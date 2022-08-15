import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  handleItemClick = e => {
    if (e.target.nodeName === 'IMG') {
      this.setState({ showModal: true });
    }
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { id, webformatURL, largeImageURL } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <li className={css.gallery_item} onClick={this.handleItemClick}>
          <img src={webformatURL} alt={id} />
        </li>

        {showModal && <Modal src={largeImageURL} onClose={this.hideModal} />}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
