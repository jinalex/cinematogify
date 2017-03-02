import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

const GifModal = (props) => {
  if (!props.selectedGif) {
    return <div></div>;
  }
  return (
    props.modalIsOpen &&
    <ModalContainer
      isOpen={ props.modalIsOpen }
      onClose={ () => props.onRequestClose()}
    >
      <ModalDialog onClose={ () => props.onRequestClose()}>
        <img src={ props.selectedGif.images.original.url } />
        <p><strong>Source:</strong> <a href={ props.selectedGif.source }>{ props.selectedGif.source }</a></p>
        <p><strong>Rating:</strong> { props.selectedGif.rating }</p>
      </ModalDialog>
    </ModalContainer>
  );
};
GifModal.propTypes = {
  modalIsOpen: React.PropTypes.bool,
  selectedGif: React.PropTypes.object,
  onRequestClose: React.PropTypes.func,
};

export default GifModal;
