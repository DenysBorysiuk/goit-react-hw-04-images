import { useState } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ smallImage, largeImage, alt }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prevState => !prevState);

  return (
    <>
      <Item onClick={toggleModal}>
        <Image src={smallImage} alt={alt} />
      </Item>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={alt} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
