import React from "react";
import "./Modal.css"; // Estilos para o modal (opcional)

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalInfo: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalInfo;
