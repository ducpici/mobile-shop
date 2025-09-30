import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50">
      {/* overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* modal content */}
      <div className="relative z-10 m-2 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg transition-all">
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
