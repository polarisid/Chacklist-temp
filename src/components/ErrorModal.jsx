// ErrorModal.js
import React from "react";
import Modal from "react-modal";

const ErrorModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Erro"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          zIndex: 100000,
        },
      }}
    >
      <h2>Atenção</h2>
      <p>{message}</p>
      <button onClick={onClose}>Fechar</button>
    </Modal>
  );
};

export default ErrorModal;
