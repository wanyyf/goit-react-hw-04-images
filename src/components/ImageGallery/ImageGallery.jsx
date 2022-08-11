import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import propTypes from 'prop-types';
import { useState } from 'react';

function ImageGallery({ photoArray }) {
  const [largeSrc, setLargeSrc] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const onItemClick = largeSrc => {
    setLargeSrc(largeSrc);
    toggleModal();
  };

  return (
    <>
      <ul className="ImageGallery">
        {photoArray.map((el, indx) => {
          return (
            <ImageGalleryItem
              src={el.webformatURL}
              alt={el.tags}
              largeSrc={el.largeImageURL}
              key={el.id + indx}
              onItemClick={onItemClick}
            />
          );
        })}
      </ul>
      {showModal && <Modal largeSrc={largeSrc} onOverlayClick={toggleModal} />}
    </>
  );
}

ImageGallery.propTypes = {
  photoArray: propTypes.array.isRequired,
};
export default ImageGallery;
