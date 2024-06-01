import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root"); // Certifique-se de que o App possui um elemento com id 'root'

interface NotificationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  playSound: () => void;
}

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onRequestClose,
  playSound,
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      playSound();

      const startTime = Date.now();
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isOpen, playSound]);

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Notification Modal"
      overlayElement={(props, contentElement) => (
        <Overlay {...props}>{contentElement}</Overlay>
      )}
    >
      <h2>Aviso de Medição</h2>
      <p>Está na hora de fazer a medição!</p>
      <p>Você está atrasado há {elapsedTime} segundos.</p>
      <button onClick={onRequestClose}>Fechar</button>
    </StyledModal>
  );
};

export default NotificationModal;
