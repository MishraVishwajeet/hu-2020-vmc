import React from 'react';
import './button.styles.scss';
import { IButtonProps } from './button.interfaces';
export enum BtnType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary', 
  SUCCESS = 'success',
  DANGER = 'danger',
}
const Button = (props: IButtonProps): JSX.Element => {
  const { title, onClick, disabled, type } = props;

  const getButtonClassNames = () => {
    return `button ${type} ${disabled ? 'disabled' : ''}`;
  };

  return (
    <button className={getButtonClassNames()} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
