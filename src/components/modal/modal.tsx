import React from 'react';
import './modal.styles.scss';
import Button from '../button/button';
import { BtnType } from '../button/button';

interface IModalProps {
  onClose?: (e: any) => void;
  show: boolean;
  text: string;
  title: string;
  okAction?: any;
}

const Modal: React.FC<IModalProps> = (props: IModalProps | any) => {
  const { onClose, show, text, title, okAction } = props;

  const onCloseHandler = (e: any) => {
    onClose && onClose(e);
  };

  if (!show) {
    return null;
  }

  const cls = title === 'Success' ? 'green' : 'yellow';

  return (
    <div className="modal" data-testid="test-modal">
      <div className="modal-content">
        <span className="close" onClick={onCloseHandler}>
          &times;
        </span>
        <h4 className={cls}>{title}</h4>
        <p className="modalText">{text}</p>
        <div className="modal-btn-container">
          <Button title="Cancel" onClick={onCloseHandler} type={BtnType.SECONDARY} />
          <Button title="OK" onClick={okAction || onCloseHandler} type={BtnType.PRIMARY} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
