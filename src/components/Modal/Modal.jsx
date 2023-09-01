import { ModalImg, ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ img, closeModal }) => {
  return (
    <Overlay onClick={closeModal}>
      <ModalWindow>
        <ModalImg src={img} alt="Big img" />
      </ModalWindow>
    </Overlay>
  );
};
