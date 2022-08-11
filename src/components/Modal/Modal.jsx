import propTypes from 'prop-types';
import { useEffect } from 'react';

function Modal({ onOverlayClick, largeSrc }) {
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);
    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  });

  const hendleKeyDown = e => {
    if (e.code === 'Escape') {
      onOverlayClick();
    }
  };

  return (
    <div
      className="Overlay"
      onClick={evt => {
        if (evt.currentTarget === evt.target) {
          onOverlayClick();
        }
      }}
    >
      <div className="Modal">
        <img src={largeSrc} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeSrc: propTypes.string.isRequired,
  onOverlayClick: propTypes.func.isRequired,
};

export default Modal;
