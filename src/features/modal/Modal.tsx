import React from 'react';
import styles from './Modal.module.css';

interface IModalProps {
  children: React.ReactNode;
  isOpen: Boolean;
  onClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default function Modal(props: IModalProps) {
  const { children, isOpen, onClose } = props;
  if (!isOpen) {
    return <></>;
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
