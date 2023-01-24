import { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    smallImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { smallImage, largeImage, alt } = this.props;

    return (
      <>
        <Item onClick={this.toggleModal}>
          <Image src={smallImage} alt={alt} />
        </Item>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt={alt} />
          </Modal>
        )}
      </>
    );
  }
}
